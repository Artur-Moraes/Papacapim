import React, { useState } from 'react';  
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { api } from '../config/api';

export default function SearchUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]); 

  const handleSearch = async () => {
    try {
      const response = await api.get(`/users?search=${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (login) => {
    try {
      if (following.includes(login)) {
        const followerId = 1; 
        await api.delete(`/users/${login}/followers/${followerId}`);
        setFollowing(following.filter((user) => user !== login)); 
        ToastAndroid.show(`Você deixou de seguir ${login}`, ToastAndroid.SHORT);
      } else {
        const response = await api.post(`/users/${login}/followers`);
        if (response.status === 201) {
          setFollowing([...following, login]); 
          ToastAndroid.show(`Você está seguindo ${login}`, ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error(error.response.data); 
      if (error.response) {
        ToastAndroid.show(
          error.response.data.message || 'Erro ao seguir/deixar de seguir o usuário',
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show('Erro de conexão', ToastAndroid.SHORT);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>Nome: {item.name}</Text>
      <Text style={styles.userText}>Login: {item.login}</Text>
      <TouchableOpacity 
        style={styles.followButton} 
        onPress={() => handleFollow(item.login)}
      >
        <Text style={styles.followButtonText}>
          {following.includes(item.login) ? 'Deixar de Seguir' : 'Seguir'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Buscar Usuários" 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
        onSubmitEditing={handleSearch} 
      />
      <View style={styles.listContainer}>
        <FlatList 
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id?.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#E8F5E9', 
    paddingHorizontal: 20,
    paddingTop: 50, 
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#28A745', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  listContainer: {
    width: '100%',
    flex: 0.75, 
  },
  userContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  followButton: {
    backgroundColor: '#FFA500', 
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
