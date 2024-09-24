// app/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await login(username, password);
            router.push('/(tabs)/'); 
        } catch (error) {
            Alert.alert('Erro', 'Credenciais inválidas.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Text style={styles.link} onPress={() => router.push('/signUpScreen')}>
                Cadastrar-se
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    link: {
        marginTop: 12,
        color: 'blue',
    },
});

export default LoginScreen;
