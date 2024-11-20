import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FloatingMenuProps {
  isVisible: boolean;
  onClose: () => void;
  options: string[];
  onOptionPress: (option: string) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ isVisible, onClose, options, onOptionPress }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => onOptionPress(option)} style={styles.option}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Adjust this value to position the menu above the tab bar
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
});

export default FloatingMenu;