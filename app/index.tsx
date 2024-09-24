// app/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
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
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            router.push('/(tabs)'); 
        } catch (error) {
            Alert.alert('Erro', error.message || 'Credenciais inválidas.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Text onPress={() => router.push('/signUpScreen')}>Cadastrar-se</Text>
        </View>
    );
};

export default LoginScreen;
