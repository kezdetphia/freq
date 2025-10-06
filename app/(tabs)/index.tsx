import CurrentlyPlayingInterface from '@/components/CurrentlyPlayingInterface';
import { ScreenWrap } from '@/components/ScreenWrap';
import { usePlayerStore } from '@/stores/usePlayerStore';
import React from 'react';
import { ScrollView, Text, YStack } from 'tamagui';

export default function HomeScreen() {
  const { name, isPlaying, setName, togglePlay, selectedId } = usePlayerStore();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const today = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <ScreenWrap noPadding>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p='$4' pt='$10' gap='$4'>
          <Text>hello</Text>
        </YStack>
      </ScrollView>

      {/* Currently Playing Bar */}
      {!selectedId && <CurrentlyPlayingInterface />}
    </ScreenWrap>
  );
}
