// screens/AuthScreen.tsx
import { router } from 'expo-router'; // ✅ Expo Router
import { useState } from 'react';

import { useAuthStore } from '@/stores/userStore';

import { ScreenWrap } from '@/components/ScreenWrap';
import { Button, H2, Input, Label, Paragraph, Separator, SizableText, Spinner, XStack, YStack, styled } from 'tamagui';

// Glass-style input wrapper
const GlassInput = styled(Input, {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  borderWidth: 1,
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  placeholderTextColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '$4',

  variants: {
    focused: {
      true: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
});

export default function AuthScreen() {
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { signUpEmail, signInEmail, loading } = useAuthStore();

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPwValid = password.length >= 6;
  const confirmOk = mode === 'in' || password === confirm;
  const disabled = loading || !isEmailValid || !isPwValid || !confirmOk;

  async function submit() {
    setError(null);
    try {
      if (mode === 'in') {
        await signInEmail(email.trim(), password);
      } else {
        if (!confirmOk) {
          setError('Passwords do not match.');
          return;
        }
        await signUpEmail(email.trim(), password);
        // If signup needs confirmation, the store handles showing the message
      }

      // Navigate to tabs on successful auth
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong.');
    }
  }

  return (
    <ScreenWrap>
      {/* <Theme name='dark'> */}
      <YStack f={1} ai='center' jc='center' p='$4'>
        <YStack gap='$4'>
          <YStack gap='$2' ai='center'>
            <H2 ta='center' color='#FFFFFF' fontSize='$10' fontWeight='700'>
              {mode === 'in' ? 'Welcome back' : 'Create your account'}
            </H2>
            <Paragraph ta='center' color='rgba(255, 255, 255, 0.8)' fontSize='$4'>
              {mode === 'in' ? 'Sign in to continue to Frequency.' : 'Sign up to start your Frequency journey.'}
            </Paragraph>
          </YStack>

          <YStack gap='$3'>
            <YStack gap='$2'>
              <Label htmlFor='email' color='#FFFFFF' fontSize='$6' fontWeight='600'>
                Email
              </Label>
              <GlassInput
                id='email'
                size='$4'
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                placeholder='you@example.com'
                placeholderTextColor='rgba(255, 255, 255, 0.6)'
              />
            </YStack>

            <YStack gap='$2'>
              <Label htmlFor='password' color='#FFFFFF' fontSize='$6' fontWeight='600'>
                Password
              </Label>
              <GlassInput
                id='password'
                size='$4'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder='Minimum 6 characters'
                placeholderTextColor='rgba(255, 255, 255, 0.6)'
              />
            </YStack>

            {mode === 'up' && (
              <YStack gap='$2'>
                <Label htmlFor='confirm' color='#FFFFFF' fontSize='$6' fontWeight='600'>
                  Confirm Password
                </Label>
                <GlassInput
                  id='confirm'
                  size='$4'
                  secureTextEntry
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder='Repeat your password'
                  placeholderTextColor='rgba(255, 255, 255, 0.6)'
                />
              </YStack>
            )}

            {error ? (
              <Paragraph color='#FF6B6B' size='$3' backgroundColor='rgba(255, 107, 107, 0.1)' padding='$2' borderRadius='$2'>
                {error}
              </Paragraph>
            ) : null}
          </YStack>

          <YStack gap='$3' mt='$2'>
            <Button
              size='$4'
              disabled={disabled}
              onPress={submit}
              backgroundColor={disabled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.9)'}
              color={disabled ? 'rgba(255, 255, 255, 0.5)' : '#6B46C1'}
              borderRadius='$4'
              fontWeight='600'
              fontSize='$4'
              pressStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transform: [{ scale: 0.98 }],
              }}
            >
              {loading ? <Spinner color={disabled ? 'rgba(255, 255, 255, 0.5)' : '#6B46C1'} /> : mode === 'in' ? 'Sign In' : 'Sign Up'}
            </Button>

            <XStack ai='center' gap='$3' jc='center'>
              <Separator flex={1} borderColor='rgba(255, 255, 255, 0.3)' />
              <SizableText size='$2' color='rgba(255, 255, 255, 0.8)'>
                or
              </SizableText>
              <Separator flex={1} borderColor='rgba(255, 255, 255, 0.3)' />
            </XStack>

            <XStack gap='$3' jc='center' fw='wrap'>
              <Button
                size='$3'
                disabled
                backgroundColor='rgba(255, 255, 255, 0.1)'
                borderColor='rgba(255, 255, 255, 0.2)'
                borderWidth={1}
                color='rgba(255, 255, 255, 0.6)'
              >
                Continue with Google
              </Button>
              <Button
                size='$3'
                disabled
                backgroundColor='rgba(255, 255, 255, 0.1)'
                borderColor='rgba(255, 255, 255, 0.2)'
                borderWidth={1}
                color='rgba(255, 255, 255, 0.6)'
              >
                Continue with Apple
              </Button>
            </XStack>
          </YStack>

          <XStack ai='center' jc='center' gap='$2' mt='$2'>
            <Paragraph color='rgba(255, 255, 255, 0.8)'>{mode === 'in' ? "Don't have an account?" : 'Already have an account?'}</Paragraph>
            <Button
              size='$3'
              variant='outlined'
              backgroundColor='transparent'
              borderColor='rgba(255, 255, 255, 0.3)'
              color='#FFFFFF'
              pressStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              }}
              onPress={() => {
                setMode(mode === 'in' ? 'up' : 'in');
                setError(null);
              }}
            >
              {mode === 'in' ? 'Create account' : 'Sign in'}
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </ScreenWrap>
  );
}
