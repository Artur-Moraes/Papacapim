// app/signUpScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register } = useAuth();
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            await register(name, login, password, passwordConfirmation);
            Alert.alert('Sucesso', 'Usuário criado com sucesso!');
            router.push('/'); 
        } catch (error) {
            Alert.alert('Erro', error.message || 'Erro ao cadastrar usuário.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Usuário"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Confirme a Senha"
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
            />
            <Button title="Cadastrar" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpScreen;
