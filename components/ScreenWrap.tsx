import { LinearGradient } from '@tamagui/linear-gradient';
import React from 'react';
import { Platform, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack, useTheme } from 'tamagui';

interface ScreenWrapProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string; // used as a fallback under the gradient
  noPadding?: boolean;
  fullBleed?: boolean;
  hasTabBar?: boolean;
  gradientColors?: string[]; // optional override
  gradientStart?: [number, number];
  gradientEnd?: [number, number];
}

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 70;

export function ScreenWrap({
  children,
  edges = [],
  backgroundColor = '$background',
  noPadding = false,
  fullBleed = false,
  hasTabBar = true,
  gradientColors = ['#7DD3FC', '#A78BFA', '#C084FC'], // calm + trustworthy
  gradientStart = [0, 0],
  gradientEnd = [1, 1],
}: ScreenWrapProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const resolvedBackgroundColor = backgroundColor.startsWith('$')
    ? theme[backgroundColor.slice(1)]?.val || theme.background.val
    : backgroundColor;

  // Full-bleed: edge-to-edge, no SafeArea wrapper
  if (fullBleed) {
    return (
      <YStack flex={1} backgroundColor={resolvedBackgroundColor}>
        <LinearGradient flex={1} colors={gradientColors} start={gradientStart} end={gradientEnd}>
          <YStack
            flex={1}
            padding={noPadding ? undefined : '$12'}
            pt={0} // truly edge-to-edge on top
            pb={hasTabBar ? TAB_BAR_HEIGHT : 0}
          >
            {children}
          </YStack>
        </LinearGradient>
      </YStack>
    );
  }

  // Default: respect safe areas
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: resolvedBackgroundColor } as ViewStyle} edges={edges}>
      <YStack flex={1} backgroundColor={resolvedBackgroundColor}>
        <LinearGradient flex={1} colors={gradientColors} start={gradientStart} end={gradientEnd}>
          <YStack
            flex={1}
            padding={noPadding ? undefined : '$6'}
            // safe-area padding already handled by SafeAreaView
          >
            {children}
          </YStack>
        </LinearGradient>
      </YStack>
    </SafeAreaView>
  );
}
