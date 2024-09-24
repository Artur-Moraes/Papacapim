import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { api } from '../config/api';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      if (response.status === 200) {
        setPosts(response.data); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as postagens.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.user_login}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text style={styles.noPosts}>Nenhuma postagem disponível.</Text>}
      />

      <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('PostScreen')}>
        <Text style={styles.postButtonText}>Escrever Postagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UpdateProfileScreen')}>
        <Text style={styles.profileButtonText}>Ver Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745', 
    marginVertical: 20,
    textAlign: 'center',
  },
  postButton: {
    backgroundColor: '#FFA500', 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#28A745', 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#28A745',
    borderWidth: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  noPosts: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
