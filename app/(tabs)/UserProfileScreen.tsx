// app/(tabs)/UserProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';

const UserProfileScreen = ({ userId }) => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`https://api.papacapim.com/users/${userId}`);
                setUserProfile(response.data);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar perfil do usuário.');
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!userProfile) return null;

    return (
        <View>
            <Text>Nome: {userProfile.name}</Text>
            <Text>Usuário: {userProfile.username}</Text>
        </View>
    );
};

export default UserProfileScreen;
