import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  return (
    <>
      <StatusBar hidden />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 16,
            right: 16,
            elevation: 0,
            margin: 10,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: 56,
            borderRadius: 28,
            paddingBottom: 0,
            alignItems: 'center',
          },
          tabBarItemStyle: {
            paddingVertical: 8,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={40}
              tint='light'
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 30,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.5)',
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={focused ? 28 : 24} name='house.fill' color={color} />,
          }}
        />
        <Tabs.Screen
          name='frequencies'
          options={{
            title: 'Frequencies',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={focused ? 28 : 24} name='waveform' color={color} />,
          }}
        />
        <Tabs.Screen
          name='discover'
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={focused ? 28 : 24} name='magnifyingglass' color={color} />,
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            title: 'explore',
            tabBarIcon: ({ color, focused }) => <IconSymbol size={focused ? 28 : 24} name='magnifyingglass' color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
