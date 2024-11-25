import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import LoginForm from '../components/LoginForm';
import GoogleLoginButton from '../components/GoogleLoginButton';
import RegistrationForm from '../components/RegistrationForm';
import { Redirect, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '@/src/features/authSlice';

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [error, setError] = useState('');

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogin = async (action) => {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, username, password);
            dispatch(setUser(userCredential));
            router.replace('/(tabs)');
            setError('');
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    };

    const handleRegistration = async () => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, username, password);
            setShowRegistration(false)
            setError('Registration successful');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log('Google login attempted');
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/images/cryptonexus-logo.png')} />
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
                {error && <Text style={styles.error}>{error}</Text>}
            </>}
            {showRegistration && <>
                <Text style={styles.subtitle}>Welcome! Please fill below details to Register.</Text>
                <RegistrationForm username={username} setUsername={setUsername}  setPassword={setPassword} handleRegistration={handleRegistration} setShowRegistration={setShowRegistration} />
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
