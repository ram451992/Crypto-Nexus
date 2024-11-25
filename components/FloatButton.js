import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, YStack, XStack, Text, Separator } from 'tamagui';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FloatButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {isMenuOpen && (
        <YStack 
          alignItems="center"
          justifyContent="flex-end"
          position="absolute"
          bottom={80}
          right={20}
          space
          backgroundColor="#ffffffee"
          padding={10}
          borderRadius={10}
          elevation={5}
        >
          {/* Menu Options */}
          <Button size="$4" onPress={() => router.push({pathname:"/(tabs)/portfolio/portfolio_add"})}>
            <Text>Add Manual Portfolio</Text>
          </Button>
          <Button size="$4" onPress={() => alert("Stretch goal feature coming soon!")}>
            <Text>Track any Wallet Address</Text>
          </Button>
        </YStack>
      )}

      {/* Plus Icon */}
      <XStack 
        style={styles.fab} 
        alignItems="center"
        justifyContent="center"
        onPress={toggleMenu}
      >
        <AntDesign name="plus" size={24} color="white" />
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e90ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
