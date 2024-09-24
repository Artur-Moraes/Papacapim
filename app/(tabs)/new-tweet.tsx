// app/(tabs)/new-tweet.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const NewTweetScreen = () => {
    const { user } = useAuth();
    const [content, setContent] = useState('');

    const handlePost = async () => {
        try {
            await axios.post(`https://api.papacapim.com/users/${user.id}/posts`, { content });
            Alert.alert('Sucesso', 'Postagem criada com sucesso.');
            setContent('');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao criar postagem.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="O que você está pensando?"
                value={content}
                onChangeText={setContent}
            />
            <Button title="Publicar" onPress={handlePost} />
        </View>
    );
};

export default NewTweetScreen;
