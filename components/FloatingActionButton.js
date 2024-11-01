import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, XStack, YStack, Text, Popover } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
      <Popover open={open} onOpenChange={setOpen} placement="top">
        <Popover.Trigger asChild>
          <Button
            size="$6"
            circular
            icon={Plus}
            onPress={() => setOpen((prev) => !prev)}
          />
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: 10, opacity: 0 }}
          exitStyle={{ y: 10, opacity: 0 }}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          elevate
        >
          <YStack space="$2" padding="$3">
            <Popover.Close asChild>
              <Button size="$3" onPress={() => console.log('Option 1 pressed')}>
                Option 1
              </Button>
            </Popover.Close>
            <Popover.Close asChild>
              <Button size="$3" onPress={() => console.log('Option 2 pressed')}>
                Option 2
              </Button>
            </Popover.Close>
            <Popover.Close asChild>
              <Button size="$3" onPress={() => console.log('Option 3 pressed')}>
                Option 3
              </Button>
            </Popover.Close>
          </YStack>
        </Popover.Content>
      </Popover>
    </View>
  );
};

export default FloatingActionButton;