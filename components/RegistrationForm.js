import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Provider as PaperProvider } from 'react-native-paper';

const RegistrationForm = ({ username, setUsername, password, setPassword, onLogin, handleRegistration, setShowRegistration }) => {
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
                    label="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    mode="outlined"
                    clearButtonMode="always"
                />
                <TextInput
                    style={styles.input}
                    label="Enter Password Again"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    mode="outlined"
                    clearButtonMode="always"
                />
                <Button mode="contained" onPress={handleRegistration} style={styles.button}>
                    Register
                </Button>

                <TouchableOpacity style={styles.registerLink} onPress={()=>setShowRegistration(false)}>
                    <Text style={styles.registerText}>Already have account? Click here to login!</Text>
                </TouchableOpacity>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    form: {
        padding: 20,
        flexDirection: 'column',
        width: '80%',
        alignSelf: 'center',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
});

export default RegistrationForm;
