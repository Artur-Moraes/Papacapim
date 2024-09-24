// app/(tabs)/UpdateProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const UpdateProfileScreen = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://api.papacapim.com/users/${user.id}`);
                setName(response.data.name);
                setUsername(response.data.username);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar dados do usuário.');
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdate = async () => {
        try {
            await axios.put(`https://api.papacapim.com/users/${user.id}`, { name, username });
            Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao atualizar dados.');
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
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Atualizar" onPress={handleUpdate} />
        </View>
    );
};

export default UpdateProfileScreen;
