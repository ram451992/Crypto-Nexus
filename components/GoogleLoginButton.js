import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GoogleLoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DB4437',
    padding: 10,
    borderRadius: 5,
    alignSelf:'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default GoogleLoginButton;