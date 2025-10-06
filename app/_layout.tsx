import { Session } from '@supabase/supabase-js';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';

import { useAuthStore } from '@/stores/userStore';
import { supabase } from '@/utils/supabase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import tamaguiConfig from '../tamagui.config';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Supabase auth error:', error);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        {/* <Stack screenOptions={{ headerShown: false }}></Stack> */}
        <Slot />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
