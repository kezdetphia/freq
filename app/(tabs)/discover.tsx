import { ScreenWrap } from '@/components/ScreenWrap';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Button, Card, H1, H2, ScrollView, styled, Text, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

const { width } = Dimensions.get('window');

const CategoryCard = styled(Card, {
  width: (width - 48) / 2,
  height: 160,
  borderRadius: '$4',
  overflow: 'hidden',
  marginBottom: '$3',
});

const CategoryButton = styled(Button, {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  borderWidth: 1,
  borderRadius: '$3',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
});

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Nature Sounds');

  const categories = ['Nature Sounds', 'Healing Music', 'Rain & Water', 'White Noise'];

  const natureSounds = [
    {
      title: 'Stream Flow',
      description: 'Vibrant mountain stream',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      gradient: ['#065f46', '#047857', '#10b981'],
    },
    {
      title: 'Waterfall Peace',
      description: 'Cascading water serenity',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      gradient: ['#1e40af', '#3b82f6', '#60a5fa'],
    },
    {
      title: 'Clear Shore',
      description: 'Tranquil clear blue water',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      gradient: ['#0891b2', '#06b6d4', '#67e8f9'],
    },
    {
      title: 'Starry Arch',
      description: 'Breathtaking nighttime',
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
      gradient: ['#1e1b4b', '#3730a3', '#6366f1'],
    },
    {
      title: 'Forest Dawn',
      description: 'Lush green tranquility',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      gradient: ['#14532d', '#166534', '#16a34a'],
    },
    {
      title: 'Ocean Sunset',
      description: 'Tranquil tones, sea, and sky',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      gradient: ['#7c2d12', '#ea580c', '#fb923c'],
    },
  ];

  return (
    <ScreenWrap noPadding>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p='$4' pt='$10' gap='$4'>
          {/* Header */}
          <YStack gap='$2' pt='$2'>
            <H1 color='#FFFFFF' fontSize='$8' fontWeight='700'>
              Discover
            </H1>
            <Text color='rgba(255, 255, 255, 0.7)' fontSize='$4'>
              Ambient sounds and healing music
            </Text>
          </YStack>

          {/* Category Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap='$2' paddingRight='$4'>
              {categories.map((category) => (
                <CategoryButton
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  backgroundColor={selectedCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
                  borderColor={selectedCategory === category ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'}
                >
                  <Text
                    color={selectedCategory === category ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                    fontSize='$3'
                    fontWeight={selectedCategory === category ? '600' : '400'}
                  >
                    {category}
                  </Text>
                </CategoryButton>
              ))}
            </XStack>
          </ScrollView>

          {/* Nature Sounds Grid */}
          <YStack gap='$3'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              🌿 {selectedCategory}
            </H2>

            <YStack gap='$3'>
              {/* Row 1 */}
              <XStack gap='$3' justifyContent='space-between'>
                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[0].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[0].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[0].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>

                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[1].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[1].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[1].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>
              </XStack>

              {/* Row 2 */}
              <XStack gap='$3' justifyContent='space-between'>
                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[2].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[2].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[2].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>

                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[3].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[3].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[3].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>
              </XStack>

              {/* Row 3 */}
              <XStack gap='$3' justifyContent='space-between'>
                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[4].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[4].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[4].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>

                <CategoryCard>
                  <LinearGradient
                    colors={natureSounds[5].gradient}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <YStack gap='$1'>
                      <H2 color='#FFFFFF' fontSize='$5' fontWeight='600'>
                        {natureSounds[5].title}
                      </H2>
                      <Text color='rgba(255,255,255,0.8)' fontSize='$2'>
                        {natureSounds[5].description}
                      </Text>
                    </YStack>
                  </LinearGradient>
                </CategoryCard>
              </XStack>
            </YStack>
          </YStack>

          {/* Recently Played */}
          <YStack gap='$3' pb='$6'>
            <H2 color='#FFFFFF' fontSize='$6' fontWeight='600'>
              🕐 Recently Played
            </H2>

            <Card backgroundColor='rgba(255, 255, 255, 0.05)' borderColor='rgba(255, 255, 255, 0.1)' borderRadius='$4' padding='$4'>
              <XStack alignItems='center' justifyContent='space-between'>
                <XStack alignItems='center' gap='$3' flex={1}>
                  <YStack width={60} height={60} borderRadius='$3' overflow='hidden'>
                    <LinearGradient
                      colors={['#2d1b69', '#8b5cf6', '#a78bfa']}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text fontSize='$6'>🧠</Text>
                    </LinearGradient>
                  </YStack>
                  <YStack flex={1}>
                    <Text color='#FFFFFF' fontSize='$4' fontWeight='600'>
                      Theta Waves 4 Hz
                    </Text>
                    <Text color='rgba(255,255,255,0.7)' fontSize='$3'>
                      Last played 2 hours ago
                    </Text>
                  </YStack>
                </XStack>
                <Button size='$3' circular backgroundColor='rgba(255, 255, 255, 0.1)' borderColor='rgba(255, 255, 255, 0.2)'>
                  <Text color='#FFFFFF' fontSize='$4'>
                    ▶️
                  </Text>
                </Button>
              </XStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </ScreenWrap>
  );
}
