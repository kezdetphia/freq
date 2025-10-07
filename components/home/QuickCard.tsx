import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { Button, Card, H2, Image, Paragraph, XStack, YStack } from 'tamagui';

interface QuickCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  subtitle?: string;
  image?: string;
  buttonLabel?: string;
  onPress?: () => void;
  borderRadius?: number | string;
  size?: string;
}

export const QuickCard = ({
  title = 'Sony A7IV',
  subtitle = 'Now available',
  image = 'https://m.media-amazon.com/images/I/71VZg+1vGFL._AC_SL1500_.jpg',
  buttonLabel = 'View',
  onPress,
  borderRadius = '$8',
  size,
  ...cardProps
}: QuickCardProps) => {
  return (
    <Card {...cardProps} bordered={false} overflow='hidden' backgroundColor='transparent' borderRadius={borderRadius} size={size}>
      {/* Glass Background */}
      <Card.Background>
        <Image alignSelf='center' source={{ uri: image }} width='100%' height='100%' resizeMode='cover' opacity={0.3} />
        <BlurView
          intensity={40}
          tint='light'
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </Card.Background>

      {/* Content */}
      <YStack padding='$4' gap='$3' flex={1} justifyContent='space-between'>
        <YStack gap='$1'>
          <H2 color='#FFFFFF' fontSize='$6' fontWeight='700'>
            {title}
          </H2>
          <Paragraph color='rgba(255, 255, 255, 0.8)' fontSize='$3'>
            {subtitle}
          </Paragraph>
        </YStack>

        <XStack justifyContent='flex-end'>
          <Button
            borderRadius='$10'
            onPress={onPress}
            size='$3'
            backgroundColor='rgba(255, 255, 255, 0.3)'
            borderWidth={1}
            borderColor='rgba(255, 255, 255, 0.5)'
            paddingHorizontal='$5'
            hoverStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }}
            pressStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              scale: 0.98,
            }}
          >
            <Paragraph color='#FFFFFF' fontWeight='600' fontSize='$3'>
              {buttonLabel}
            </Paragraph>
          </Button>
        </XStack>
      </YStack>
    </Card>
  );
};
