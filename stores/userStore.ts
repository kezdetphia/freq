// stores/auth.ts
import { supabase } from '@/utils/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'premium';
  created_at: string;
  updated_at: string;
};

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  init: () => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;

  refreshProfile: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,
  error: null,

  init: async () => {
    set({ loading: true, error: null });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session: session ?? null, user: session?.user ?? null });
    if (session?.user) {
      await get()
        .refreshProfile()
        .catch(() => set({ profile: null }));
    }
    // live updates
    supabase.auth.onAuthStateChange(async (_evt, sess) => {
      set({ session: sess ?? null, user: sess?.user ?? null });
      if (sess?.user) {
        await get()
          .refreshProfile()
          .catch(() => set({ profile: null }));
      } else {
        set({ profile: null });
      }
    });
    set({ loading: false });
  },

  signUpEmail: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }

    // If your project requires email confirm, there may be no session yet.
    // Try to get a session; if none, we stop here and show a message.
    let sess = (await supabase.auth.getSession()).data.session;
    if (!sess) {
      set({
        loading: false,
        error: 'Check your email to confirm your account before signing in.',
      });
      return;
    }

    // Ensure a profile row exists NOW (don’t wait for trigger).
    await ensureProfile(sess.user.id);

    // Load profile into store.
    await get()
      .refreshProfile()
      .catch(() => {});
    set({ loading: false });
  },

  signInEmail: async (email, password) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }

    // Wait for session to settle and ensure profile.
    const sess = await waitForSession(1500); // small wait on fresh sign-in
    if (sess?.user?.id) {
      await ensureProfile(sess.user.id); // upsert just in case
      await get()
        .refreshProfile()
        .catch(() => {});
    }

    set({ loading: false });
  },

  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
    set({ session: null, user: null, profile: null, loading: false });
  },

  refreshProfile: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      set({ profile: null });
      return;
    }
    // tiny retry in case trigger is a tick behind
    const prof = await waitForProfile(user.id, 1200);
    set({ profile: prof });
  },
}));

// --- helpers ---

async function waitForSession(timeoutMs: number) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return session;
    await sleep(120);
  }
  return null;
}

async function waitForProfile(userId: string, timeoutMs: number): Promise<Profile | null> {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!error && data) return data as Profile;
    await sleep(120);
  }
  return null;
}

async function ensureProfile(userId: string) {
  // Safe with your RLS policy: "Users can insert own profile"
  // If trigger already inserted, this becomes a no-op due to ON CONFLICT.
  const { error } = await supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true });
  if (error) throw error;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
