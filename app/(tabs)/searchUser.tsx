// app/(tabs)/searchUser.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import axios from 'axios';

const SearchUserScreen = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.papacapim.com/users?username=${username}`);
            setUsers(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar usuários.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Buscar usuário"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Buscar" onPress={handleSearch} />
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.username}</Text>
                )}
            />
        </View>
    );
};

export default SearchUserScreen;
