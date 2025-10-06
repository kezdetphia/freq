import { ScreenWrap } from '@/components/ScreenWrap';
import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, H1, H2, ScrollView, styled, Text, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

const { width } = Dimensions.get('window');

const GradientCard = styled(Card, {
  width: width - 32,
  height: 200,
  borderRadius: '$6',
  overflow: 'hidden',
  marginHorizontal: 4,
});

const HeroCard = styled(Card, {
  width: width - 32,
  height: 300,
  borderRadius: '$6',
  overflow: 'hidden',
  marginBottom: '$4',
  position: 'relative',
});

export default function HomeScreen() {
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
          {/* Greeting Header */}
          <YStack gap='$1' pt='$2'>
            <Text color='rgba(255, 255, 255, 0.7)' fontSize='$4'>
              {today}
            </Text>
            <H1 color='#FFFFFF' fontSize='$9' fontWeight='700'>
              {greeting}
            </H1>
          </YStack>

          {/* Hero Focus Card */}
          <HeroCard>
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 1,
              }}
            />
            <LinearGradient colors={['#4c1d95', '#5b21b6', '#7c3aed']} style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
              <YStack zIndex={2} gap='$2'>
                <H2 color='#FFFFFF' fontSize='$7' fontWeight='600'>
                  Focus Music
                </H2>
                <Button
                  size='$4'
                  circular
                  backgroundColor='rgba(255, 255, 255, 0.9)'
                  borderRadius={30}
                  width={60}
                  height={60}
                  alignSelf='center'
                  mt='$2'
                >
                  <Text fontSize='$6'>⏸️</Text>
                </Button>
              </YStack>
            </LinearGradient>
          </HeroCard>

          {/* Pure Theta Waves Section */}
          <YStack gap='$3'>
            <XStack justifyContent='space-between' alignItems='center'>
              <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                🧠 Pure Theta Waves
              </H2>
              <Button variant='outlined' size='$2' circular borderColor='rgba(255,255,255,0.3)'>
                <Text color='#FFFFFF'>›</Text>
              </Button>
            </XStack>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap='$3' pl='$1' pr='$4'>
                <GradientCard>
                  <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                    <YStack gap='$2'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        Theta Waves 7.5 Hz
                      </H2>
                      <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                        Enhance Artistic Flow, Problem-Solving, and Self-Awareness
                      </Text>
                    </YStack>
                  </LinearGradient>
                </GradientCard>

                <GradientCard>
                  <LinearGradient colors={['#2d1b69', '#8b5cf6', '#a78bfa']} style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                    <YStack gap='$2'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        Theta Waves 4 Hz
                      </H2>
                      <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                        Foster Love, Warmth, and Emotional Healing
                      </Text>
                    </YStack>
                  </LinearGradient>
                </GradientCard>
              </XStack>
            </ScrollView>
          </YStack>

          {/* Super Concentration Section */}
          <YStack gap='$3'>
            <XStack justifyContent='space-between' alignItems='center'>
              <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                🎯 Super Concentration and Focus
              </H2>
              <Button variant='outlined' size='$2' circular borderColor='rgba(255,255,255,0.3)'>
                <Text color='#FFFFFF'>›</Text>
              </Button>
            </XStack>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap='$3' pl='$1' pr='$4'>
                <GradientCard>
                  <LinearGradient colors={['#065f46', '#047857', '#10b981']} style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                    <YStack gap='$2'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        Alpha Waves
                      </H2>
                      <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                        Relaxing Studying Music, Brain Power
                      </Text>
                    </YStack>
                  </LinearGradient>
                </GradientCard>

                <GradientCard>
                  <LinearGradient colors={['#374151', '#4b5563', '#6b7280']} style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                    <YStack gap='$2'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        Focus Music
                      </H2>
                      <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                        Concentration-Enhancing Binaural Beats
                      </Text>
                    </YStack>
                  </LinearGradient>
                </GradientCard>
              </XStack>
            </ScrollView>
          </YStack>

          {/* Soothing Relaxation Section */}
          <YStack gap='$3'>
            <XStack justifyContent='space-between' alignItems='center'>
              <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
                😌 Soothing Relaxation
              </H2>
              <Button variant='outlined' size='$2' circular borderColor='rgba(255,255,255,0.3)'>
                <Text color='#FFFFFF'>›</Text>
              </Button>
            </XStack>

            <GradientCard>
              <LinearGradient colors={['#1e3a8a', '#3b82f6', '#60a5fa']} style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                <YStack gap='$2'>
                  <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                    Delta Waves
                  </H2>
                  <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                    Deep Sleep, Healing, and Recovery
                  </Text>
                </YStack>
              </LinearGradient>
            </GradientCard>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Currently Playing Bar */}
      <YStack
        position='absolute'
        bottom={90}
        left={30}
        right={30}
        backgroundColor='rgba(0,0,0,0.9)'
        p='$3'
        borderTopWidth={1}
        borderTopColor='rgba(255,255,255,0.1)'
      >
        <XStack alignItems='center' justifyContent='space-between'>
          <XStack alignItems='center' gap='$3' flex={1}>
            <YStack width={50} height={50} borderRadius='$2' backgroundColor='$blue10' justifyContent='center' alignItems='center'>
              <Text fontSize='$6'>🧠</Text>
            </YStack>
            <YStack flex={1}>
              <Text color='#FFFFFF' fontSize='$4' fontWeight='600'>
                Theta Waves 4 Hz
              </Text>
              <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                01:59:59
              </Text>
            </YStack>
          </XStack>
          <XStack alignItems='center' gap='$2'>
            <Button size='$3' circular backgroundColor='rgba(255,255,255,0.1)'>
              <Text color='#FFFFFF'>⏱️</Text>
            </Button>
            <Button size='$3' circular backgroundColor='rgba(255,255,255,0.1)'>
              <Text color='#FFFFFF'>⏸️</Text>
            </Button>
          </XStack>
        </XStack>
      </YStack>
    </ScreenWrap>
  );
}
