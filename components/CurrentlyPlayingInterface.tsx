import { usePlayerStore } from '@/stores/usePlayerStore';
import { Button, Text, XStack, YStack } from 'tamagui';

const CurrentlyPlayingInterface = () => {
  const { name, isPlaying, togglePlay } = usePlayerStore();

  return (
    <YStack
      position='absolute'
      bottom={100}
      left={30}
      right={30}
      backgroundColor='rgba(0,0,0,0.2)'
      p='$3'
      borderTopWidth={1}
      borderTopColor='rgba(255,255,255,0.1)'
      borderRadius={30}
    >
      <XStack alignItems='center' justifyContent='space-between'>
        <XStack alignItems='center' gap='$3' flex={1}>
          <YStack width={50} height={50} borderRadius='$2' backgroundColor='$blue10' justifyContent='center' alignItems='center'>
            <Text fontSize='$6'>🧠</Text>
          </YStack>
          <YStack flex={1}>
            <Text color='#FFFFFF' fontSize='$4' fontWeight='600'>
              {name ? name : 'Theta Waves 4 Hz'}
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
          <Button onPress={togglePlay} size='$3' circular backgroundColor='rgba(255,255,255,0.1)'>
            <Text color='#FFFFFF'>⏸️</Text>
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default CurrentlyPlayingInterface;
