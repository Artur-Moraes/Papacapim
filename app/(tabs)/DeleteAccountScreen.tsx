// app/(tabs)/DeleteAccountScreen.tsx
import React from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const DeleteAccountScreen = () => {
    const { user, logout } = useAuth();

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`https://api.papacapim.com/users/${user.id}`);
            Alert.alert('Sucesso', 'Conta excluída com sucesso.');
            logout();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao excluir conta.');
        }
    };

    return (
        <View>
            <Button title="Excluir Conta" onPress={handleDeleteAccount} />
        </View>
    );
};

export default DeleteAccountScreen;
