import { ScreenWrap } from '@/components/ScreenWrap';
import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, H1, H2, ScrollView, styled, Text, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';
const { width } = Dimensions.get('window');

const FrequencyCard = styled(Card, {
  width: width - 32,
  height: 180,
  borderRadius: '$6',
  overflow: 'hidden',
  marginBottom: '$3',
});

const SmallCard = styled(Card, {
  width: (width - 48) / 2,
  height: 140,
  borderRadius: '$4',
  overflow: 'hidden',
});

export default function FrequenciesScreen() {
  return (
    <ScreenWrap noPadding fullBleed>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p='$4' pt='$12' gap='$4'>
          {/* Header */}
          <YStack gap='$2' pt='$2'>
            <H1 color='#FFFFFF' fontSize='$8' fontWeight='700'>
              Frequencies
            </H1>
            <Text color='rgba(255, 255, 255, 0.7)' fontSize='$4'>
              Explore healing frequencies and binaural beats
            </Text>
          </YStack>

          {/* Pure Theta Waves */}
          <YStack gap='$3'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              🧠 Pure Theta Waves
            </H2>

            <FrequencyCard>
              <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <YStack gap='$2'>
                  <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                    Theta Waves 7.5 Hz
                  </H2>
                  <Text color='rgba(255,255,255,0.8)' fontSize='$4'>
                    Enhance Artistic Flow, Problem-Solving, and Self-Awareness
                  </Text>
                </YStack>
                <XStack justifyContent='space-between' alignItems='center'>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$3'>
                    7.5 Hz • 30 min sessions
                  </Text>
                  <Button size='$4' circular backgroundColor='rgba(255, 255, 255, 0.2)' borderColor='rgba(255, 255, 255, 0.3)'>
                    <Text color='#FFFFFF' fontSize='$5'>
                      ▶️
                    </Text>
                  </Button>
                </XStack>
              </LinearGradient>
            </FrequencyCard>

            <FrequencyCard>
              <LinearGradient colors={['#2d1b69', '#8b5cf6', '#a78bfa']} style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <YStack gap='$2'>
                  <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                    Theta Waves 4 Hz
                  </H2>
                  <Text color='rgba(255,255,255,0.8)' fontSize='$4'>
                    Foster Love, Warmth, and Emotional Healing
                  </Text>
                </YStack>
                <XStack justifyContent='space-between' alignItems='center'>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$3'>
                    4 Hz • 60 min sessions
                  </Text>
                  <Button size='$4' circular backgroundColor='rgba(255, 255, 255, 0.2)' borderColor='rgba(255, 255, 255, 0.3)'>
                    <Text color='#FFFFFF' fontSize='$5'>
                      ⏸️
                    </Text>
                  </Button>
                </XStack>
              </LinearGradient>
            </FrequencyCard>
          </YStack>

          {/* Alpha & Beta Waves */}
          <YStack gap='$3'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              🎯 Focus & Concentration
            </H2>

            <XStack gap='$3' justifyContent='space-between'>
              <SmallCard>
                <LinearGradient
                  colors={['#065f46', '#047857', '#10b981']}
                  style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}
                >
                  <YStack gap='$1'>
                    <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                      Alpha Waves
                    </H2>
                    <Text color='rgba(255,255,255,0.8)' fontSize='$3'>
                      8-14 Hz
                    </Text>
                  </YStack>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$2'>
                    Relaxed Focus
                  </Text>
                </LinearGradient>
              </SmallCard>

              <SmallCard>
                <LinearGradient
                  colors={['#dc2626', '#ef4444', '#f87171']}
                  style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}
                >
                  <YStack gap='$1'>
                    <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                      Beta Waves
                    </H2>
                    <Text color='rgba(255,255,255,0.8)' fontSize='$3'>
                      14-30 Hz
                    </Text>
                  </YStack>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$2'>
                    Active Focus
                  </Text>
                </LinearGradient>
              </SmallCard>
            </XStack>
          </YStack>

          {/* Delta & Gamma Waves */}
          <YStack gap='$3'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              💤 Sleep & Deep States
            </H2>

            <XStack gap='$3' justifyContent='space-between'>
              <SmallCard>
                <LinearGradient
                  colors={['#1e3a8a', '#3b82f6', '#60a5fa']}
                  style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}
                >
                  <YStack gap='$1'>
                    <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                      Delta Waves
                    </H2>
                    <Text color='rgba(255,255,255,0.8)' fontSize='$3'>
                      0.5-4 Hz
                    </Text>
                  </YStack>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$2'>
                    Deep Sleep
                  </Text>
                </LinearGradient>
              </SmallCard>

              <SmallCard>
                <LinearGradient
                  colors={['#7c2d12', '#ea580c', '#fb923c']}
                  style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}
                >
                  <YStack gap='$1'>
                    <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                      Gamma Waves
                    </H2>
                    <Text color='rgba(255,255,255,0.8)' fontSize='$3'>
                      30-100 Hz
                    </Text>
                  </YStack>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$2'>
                    Peak Awareness
                  </Text>
                </LinearGradient>
              </SmallCard>
            </XStack>
          </YStack>

          {/* Solfeggio Frequencies */}
          <YStack gap='$3' pb='$6'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              🎵 Solfeggio Frequencies
            </H2>

            <FrequencyCard>
              <LinearGradient colors={['#581c87', '#8b5cf6', '#c084fc']} style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <YStack gap='$2'>
                  <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                    528 Hz - Love Frequency
                  </H2>
                  <Text color='rgba(255,255,255,0.8)' fontSize='$4'>
                    DNA Repair, Transformation, and Miracles
                  </Text>
                </YStack>
                <XStack justifyContent='space-between' alignItems='center'>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$3'>
                    528 Hz • Healing tone
                  </Text>
                  <Button size='$4' circular backgroundColor='rgba(255, 255, 255, 0.2)' borderColor='rgba(255, 255, 255, 0.3)'>
                    <Text color='#FFFFFF' fontSize='$5'>
                      ▶️
                    </Text>
                  </Button>
                </XStack>
              </LinearGradient>
            </FrequencyCard>

            <FrequencyCard>
              <LinearGradient colors={['#134e4a', '#0f766e', '#14b8a6']} style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <YStack gap='$2'>
                  <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                    432 Hz - Earth Frequency
                  </H2>
                  <Text color='rgba(255,255,255,0.8)' fontSize='$4'>
                    Natural Healing, Peace, and Harmony
                  </Text>
                </YStack>
                <XStack justifyContent='space-between' alignItems='center'>
                  <Text color='rgba(255,255,255,0.6)' fontSize='$3'>
                    432 Hz • Natural tuning
                  </Text>
                  <Button size='$4' circular backgroundColor='rgba(255, 255, 255, 0.2)' borderColor='rgba(255, 255, 255, 0.3)'>
                    <Text color='#FFFFFF' fontSize='$5'>
                      ▶️
                    </Text>
                  </Button>
                </XStack>
              </LinearGradient>
            </FrequencyCard>
          </YStack>
        </YStack>
      </ScrollView>
    </ScreenWrap>
  );
}
