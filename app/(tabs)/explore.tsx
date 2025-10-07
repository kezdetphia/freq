import CurrentlyPlayingInterface from '@/components/CurrentlyPlayingInterface';
import { ScreenWrap } from '@/components/ScreenWrap';
import { usePlayerStore } from '@/stores/usePlayerStore';
import Frequency from '@/types/frequency';
import { supabase } from '@/utils/supabase';
import { useAudioPlayer } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Card, H3, Input, Spinner, Text, XStack, YStack } from 'tamagui';

export default function ExploreScreen() {
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [filteredFrequencies, setFilteredFrequencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const player = useAudioPlayer();
  const { setAudioPlayer, playFrequency, selectedId, isPlaying } = usePlayerStore();

  useEffect(() => {
    // Initialize audio player in store
    setAudioPlayer(player);
    fetchFrequencies();
    console.log('frequencies loaded', frequencies[0]);
  }, []);

  useEffect(() => {
    // Filter frequencies based on search
    if (searchQuery.trim() === '') {
      setFilteredFrequencies(frequencies);
    } else {
      const filtered = frequencies.filter(
        (freq) =>
          freq.name.toLowerCase().includes(searchQuery.toLowerCase()) || freq.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFrequencies(filtered);
    }
  }, [searchQuery, frequencies]);

  const fetchFrequencies = async () => {
    try {
      const { data, error } = await supabase.from('frequencies').select('*').eq('is_active', true).order('name');

      if (error) throw error;

      console.log(`✅ Fetched ${data?.length || 0} frequencies from database`);
      setFrequencies(data || []);
      setFilteredFrequencies(data || []);
    } catch (error) {
      console.error('❌ Error fetching frequencies:', error);
      setFrequencies([]);
      setFilteredFrequencies([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayFrequency = async (frequency: any) => {
    await playFrequency(frequency);
  };

  const renderFrequency = ({ item }: { item: any }) => {
    const isCurrentlyPlaying = selectedId === item.id && isPlaying;

    return (
      <Card
        marginHorizontal='$4'
        marginVertical='$2'
        padding='$4'
        backgroundColor='rgba(255, 255, 255, 0.05)'
        borderColor='rgba(255, 255, 255, 0.1)'
        pressStyle={{ scale: 0.98 }}
        onPress={() => handlePlayFrequency(item)}
      >
        <XStack justifyContent='space-between' alignItems='center'>
          <YStack flex={1} marginRight='$3'>
            <H3 size='$5' color='#FFFFFF'>
              {item.name}
            </H3>
            <Text color='$purple10' fontSize='$3' marginTop='$1'>
              {item.hz_value} Hz{item.category ? ` • ${item.category}` : ''}
            </Text>
            <Text color='$gray10' fontSize='$2' marginTop='$2' numberOfLines={2}>
              {item.description}
            </Text>
            <Text color='$gray9' fontSize='$1' marginTop='$1'>
              Tap to play generated tone
            </Text>
          </YStack>

          <Button
            size='$4'
            circular
            backgroundColor={isCurrentlyPlaying ? '$red10' : '$purple10'}
            icon={
              <Text fontSize='$5' color='#FFFFFF'>
                {isCurrentlyPlaying ? '⏸' : '▶'}
              </Text>
            }
          />
        </XStack>
      </Card>
    );
  };

  if (loading) {
    return (
      <ScreenWrap>
        <YStack flex={1} justifyContent='center' alignItems='center'>
          <Spinner size='large' color='$purple10' />
        </YStack>
      </ScreenWrap>
    );
  }

  return (
    <ScreenWrap noPadding>
      <YStack flex={1}>
        <YStack padding='$4' paddingBottom='$2' pt='$12' gap='$2'>
          <H3 size='$7' color='#FFFFFF'>
            Rife Frequencies
          </H3>
          <Text color='$gray10'>{frequencies.length} healing frequencies • Tap to play</Text>

          {/* Search Input */}
          <Input
            placeholder='Search frequencies...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            backgroundColor='rgba(255, 255, 255, 0.1)'
            borderColor='rgba(255, 255, 255, 0.2)'
            color='#FFFFFF'
            placeholderTextColor='rgba(255, 255, 255, 0.5)'
            marginTop='$2'
          />
        </YStack>

        <FlatList
          data={filteredFrequencies}
          keyExtractor={(item) => item.id}
          renderItem={renderFrequency}
          contentContainerStyle={{ paddingBottom: 120 }}
          ListEmptyComponent={
            <YStack padding='$4' alignItems='center'>
              <Text color='$gray10'>No frequencies found</Text>
            </YStack>
          }
        />
      </YStack>
      <CurrentlyPlayingInterface />
    </ScreenWrap>
  );
}
