import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Provider as PaperProvider } from 'react-native-paper';

const LoginForm = ({ username, setUsername, password, setPassword, onLogin, setShowRegistration }) => {
    return (
        <PaperProvider style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    clearButtonMode="always"
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    mode="outlined"
                    clearButtonMode="always"
                />
                <Button mode="contained" onPress={onLogin} style={styles.button}>
                    Login
                </Button>
                <TouchableOpacity style={styles.registerLink} onPress={()=>setShowRegistration(true)}>
                    <Text style={styles.registerText}>Don't have account? Click here to register!</Text>
                </TouchableOpacity>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    form: {
        padding: 20,
        flexDirection: 'column',
        width: '85%',
        alignSelf: 'center',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
    registerLink:{
        textDecorationLine:'underline'
    },
    registerText:{
        margin:5,
        textDecorationLine:'underline'
    }
});

export default LoginForm;
