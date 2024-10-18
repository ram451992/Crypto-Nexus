import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import LoginForm from '../components/LoginForm';
import GoogleLoginButton from '../components/GoogleLoginButton';
import RegistrationForm from '@/components/RegistrationForm';

export default function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLogin = () => {
        Alert.alert(
          "Success",
          "Login is successful. Redirecitng to Dashboard!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      };

      const handleRegistration = () => {
        Alert.alert(
          "Success",
          "Registration is successful. Redirecitng to Login!",
          [
            { text: "Login", onPress: () => {setUsername('');setPassword('');setShowRegistration(false)} }
          ]
        );
      };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log('Google login attempted');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('@/assets/images/cryptonexus-logo.png')} />
                <Text style={[styles.title, { paddingLeft: 10, fontWeight: 100 }]}>Crypto</Text><Text style={styles.title}>Nexus</Text>
            </View>
            {!showRegistration && <>
                <Text style={styles.subtitle}>Login to Manage Your Crypto Portfolio on Multiple Devices</Text>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    onLogin={handleLogin}
                    setShowRegistration={setShowRegistration}
                />
            </>}
            {showRegistration && <>
                <Text style={styles.subtitle}>Welcome! Please fill below details to Register.</Text>
                <RegistrationForm handleRegistration={handleRegistration} setShowRegistration={setShowRegistration} />
            </>}
            {/*<GoogleLoginButton onPress={handleGoogleLogin} />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 80,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    logo: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 32,
        color: 'black',
    },
    subtitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: '300',
        margin: 25,
        alignContent: 'center',
        textAlign: 'center',
        lineHeight: 40
    },

});
