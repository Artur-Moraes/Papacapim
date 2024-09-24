import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth(); 
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            await register(name, username, password);
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
            router.push('/'); 
        } catch (error) {
            Alert.alert('Erro', error.message); 
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
            <Button title="Cadastrar" onPress={handleSignUp} />
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
});

export default SignUpScreen;
