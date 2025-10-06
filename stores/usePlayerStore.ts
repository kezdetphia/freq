import { create } from 'zustand';
import { generateToneDataUri } from '@/utils/frequencyPlayer';

interface FrequencyData {
  id: string;
  name: string;
  hz_value: number;
  description?: string;
  category?: string;
}

interface PlayerState {
  // Current state
  selectedId: string | null;
  name: string;
  frequency: number | null;
  isPlaying: boolean;

  // Audio player reference (will be set from component)
  audioPlayer: any | null;

  // Actions
  setAudioPlayer: (player: any) => void;
  playFrequency: (frequency: FrequencyData) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  selectedId: null,
  name: '',
  frequency: null,
  isPlaying: false,
  audioPlayer: null,

  setAudioPlayer: (player) => {
    set({ audioPlayer: player });
  },

  playFrequency: async (frequency: FrequencyData) => {
    const { audioPlayer, selectedId, isPlaying } = get();

    if (!audioPlayer) {
      console.error('❌ Audio player not initialized');
      return;
    }

    try {
      // If clicking the same frequency while playing, pause it
      if (selectedId === frequency.id && isPlaying) {
        audioPlayer.pause();
        set({ isPlaying: false });
        console.log('⏸️ Paused');
        return;
      }

      // Parse frequency value
      const freqValue = parseFloat(frequency.hz_value.toString());

      if (isNaN(freqValue)) {
        console.error('❌ Invalid frequency value:', frequency.hz_value);
        return;
      }

      // Stop current playback if any
      if (audioPlayer.playing) {
        audioPlayer.pause();
      }

      console.log(`🎵 Playing: ${frequency.name} (${freqValue} Hz)`);

      // Generate tone
      const dataUri = generateToneDataUri(freqValue, 30);

      // Load and play
      await audioPlayer.replace({ uri: dataUri });
      audioPlayer.loop = true;
      audioPlayer.play();

      // Update state
      set({
        selectedId: frequency.id,
        name: frequency.name,
        frequency: freqValue,
        isPlaying: true,
      });

      console.log(`✅ Now playing: ${frequency.name} (${freqValue} Hz)`);
    } catch (error) {
      console.error('❌ Error playing frequency:', error);
      set({ isPlaying: false });
    }
  },

  pause: () => {
    const { audioPlayer } = get();
    if (audioPlayer && audioPlayer.playing) {
      audioPlayer.pause();
      set({ isPlaying: false });
      console.log('⏸️ Paused');
    }
  },

  resume: () => {
    const { audioPlayer } = get();
    if (audioPlayer && !audioPlayer.playing) {
      audioPlayer.play();
      set({ isPlaying: true });
      console.log('▶️ Resumed');
    }
  },

  stop: () => {
    const { audioPlayer } = get();
    if (audioPlayer && audioPlayer.playing) {
      audioPlayer.pause();
    }
    set({
      selectedId: null,
      name: '',
      frequency: null,
      isPlaying: false,
    });
    console.log('⏹️ Stopped');
  },

  togglePlay: () => {
    const { isPlaying, pause, resume } = get();
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  },
}));
