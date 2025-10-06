import { ScreenWrap } from '@/components/ScreenWrap';
import { supabase } from '@/utils/supabase';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button, Card, H3, Spinner, Text, XStack, YStack } from 'tamagui';

export default function FrequenciesScreen() {
  const [frequencies, setFrequencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free');

  const player = useAudioPlayer();

  useEffect(() => {
    fetchFrequencies();
    checkUserSubscription();

    return () => {
      if (player && player.playing) {
        player.pause();
      }
    };
  }, []);

  const fetchFrequencies = async () => {
    try {
      const { data, error } = await supabase
        .from('frequencies')
        .select('*')
        .eq('is_active', true)
        .order('is_premium', { ascending: true })
        .order('name');

      if (error) throw error;

      console.log('Fetched frequencies:', data);
      setFrequencies(data || []);
    } catch (error) {
      console.error('Error fetching frequencies:', error);
      // Silently fail - no alert for network issues
      setFrequencies([]);
    } finally {
      setLoading(false);
    }
  };

  const checkUserSubscription = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase.from('user_subscriptions').select('subscription_tier').eq('user_id', user.id).single();

        if (data?.subscription_tier === 'premium') {
          setUserTier('premium');
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      // Silently fail - network unavailable
    }
  };

  const playFrequency = async (frequency: any) => {
    console.log('Attempting to play:', frequency.name);
    console.log('Audio URL:', frequency.audio_url);
    if (frequency.is_premium && userTier !== 'premium') {
      Alert.alert('Premium Required', 'Upgrade to Premium to access this frequency');
      return;
    }

    if (!frequency.audio_url) {
      Alert.alert('Audio Not Available', 'This frequency audio is not yet available');
      return;
    }

    try {
      if (playing === frequency.id && player.playing) {
        player.pause();
        setPlaying(null);
        return;
      }

      console.log('Loading audio from:', frequency.audio_url);

      const audioSource: AudioSource = {
        uri: frequency.audio_url,
      };

      await player.replace(audioSource);
      player.loop = true;
      player.play();

      setPlaying(frequency.id);
    } catch (error) {
      console.error('Error playing frequency:', error);
      Alert.alert('Error', 'Failed to play this frequency');
      setPlaying(null);
    }
  };

  const renderFrequency = ({ item }: { item: any }) => {
    const isLocked = item.is_premium && userTier !== 'premium';
    const isPlaying = playing === item.id;
    const hasAudio = !!item.audio_url;

    return (
      <Card
        marginHorizontal='$4'
        marginVertical='$2'
        padding='$4'
        backgroundColor={isLocked ? '$gray2' : '$background'}
        opacity={isLocked ? 0.7 : 1}
        pressStyle={{ scale: 0.98 }}
        onPress={() => hasAudio && playFrequency(item)}
      >
        <XStack justifyContent='space-between' alignItems='center'>
          <YStack flex={1} marginRight='$3'>
            <XStack alignItems='center' space='$2'>
              <H3 size='$5'>{item.name}</H3>
              {item.is_premium && <Icon name='lock' size={16} color={userTier === 'premium' ? '#10b981' : '#6b7280'} />}
            </XStack>
            <Text color='$purple10' fontSize='$3' marginTop='$1'>
              {item.hz_value} Hz • {item.category}
            </Text>
            <Text color='$gray10' fontSize='$2' marginTop='$2'>
              {item.description}
            </Text>
            <Text color='$gray9' fontSize='$1' marginTop='$1'>
              Duration: {Math.floor(item.duration_seconds / 60)} minutes
            </Text>
            {!hasAudio && (
              <Text color='$red10' fontSize='$1' marginTop='$1'>
                Audio coming soon
              </Text>
            )}
          </YStack>

          <Button
            size='$4'
            circular
            backgroundColor={isPlaying ? '$red10' : '$purple10'}
            disabled={isLocked || !hasAudio}
            icon={<Icon name={isPlaying ? 'pause' : 'play'} size={20} color='white' />}
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
        <YStack padding='$4' paddingBottom='$2'>
          <H3 size='$7'>Healing Frequencies</H3>
          <Text color='$gray10'>Tap to play • Premium frequencies marked with lock</Text>
        </YStack>

        <FlatList
          data={frequencies}
          keyExtractor={(item) => item.id}
          renderItem={renderFrequency}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {userTier === 'free' && (
          <Card
            backgroundColor='$purple10'
            margin='$4'
            padding='$3'
            pressStyle={{ scale: 0.98 }}
            onPress={() => {
              /* Navigate to subscription screen */
            }}
          >
            <Text color='white' textAlign='center' fontWeight='bold'>
              Unlock All Frequencies - $4.99/month
            </Text>
          </Card>
        )}
      </YStack>
    </ScreenWrap>
  );
}
