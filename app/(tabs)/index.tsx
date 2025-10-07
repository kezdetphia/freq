import CurrentlyPlayingInterface from '@/components/CurrentlyPlayingInterface';
import { QuickCard } from '@/components/home/QuickCard';
import { ScreenWrap } from '@/components/ScreenWrap';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { supabase } from '@/utils/supabase';
import { useAudioPlayer } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { ScrollView, XStack, YStack } from 'tamagui';

const frequencies = [
  { id: '1', name: 'Theta', category: 'Category A', hz: 432 },
  { id: '2', name: 'Beta', category: 'Category B', hz: 528 },
  { id: '3', name: 'Gamma', category: 'Category A', hz: 639 },
  { id: '4', name: 'Alpha', category: 'Category C', hz: 741 },
];

export default function HomeScreen() {
  const player = useAudioPlayer();
  const { name, isPlaying, togglePlay, selectedId, playFrequency, setAudioPlayer } = usePlayerStore();

  const [music, setMusic] = useState<any[]>([]);

  // const currentTime = new Date();
  // const currentHour = currentTime.getHours();
  // const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  // const today = currentTime.toLocaleDateString('en-US', {
  //   weekday: 'short',
  //   day: 'numeric',
  //   month: 'short',
  // });

  const fetchMusic = async () => {
    const { data, error } = await supabase.storage.from('audiofiles').list('binauralbeats', { limit: 100 });

    if (!error && data) {
      const musicWithUrls = data.map((file) => {
        const { data: urlData } = supabase.storage.from('audiofiles').getPublicUrl(`binauralbeats/${file.name}`);

        return {
          id: file.id,
          name: file.name,
          url: urlData.publicUrl,
        };
      });

      setMusic(musicWithUrls);
    }
  };

  useEffect(() => {
    setAudioPlayer(player);
    fetchMusic();
  }, []);

  console.log('Music files:', music);

  return (
    <ScreenWrap noPadding>
      <ScrollView showsVerticalScrollIndicator={false} pt={'$6'}>
        <YStack p='' pt='$10' gap='$4'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} gap='$3'>
            <XStack gap='$3' px='$4'>
              {music?.map((song) => (
                <QuickCard
                  key={song?.id}
                  title={song?.name}
                  subtitle='Binaural Beats'
                  image='https://example.com/song.png'
                  buttonLabel={selectedId === song.id && isPlaying ? 'Pause' : 'Play'}
                  onPress={() => playFrequency({ id: song.id, name: song.name, url: song.url })}
                  elevate
                  size='$4'
                  width={180}
                  height={220}
                  borderRadius='$8'
                />
              ))}
            </XStack>
          </ScrollView>
        </YStack>
      </ScrollView>

      {/* Currently Playing Bar */}
      <CurrentlyPlayingInterface />
    </ScreenWrap>
  );
}
