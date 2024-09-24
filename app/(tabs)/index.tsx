// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const FeedScreen = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://api.papacapim.com/users/${user.id}/posts`);
                setPosts(response.data);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar postagens.');
            }
        };

        fetchPosts();
    }, [user]);

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default FeedScreen;
