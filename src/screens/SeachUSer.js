import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { api } from '../config/api';

export default function SearchUsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/users?search=${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>Nome: {item.name}</Text>
      <Text style={styles.userText}>Login: {item.login}</Text>
      <TouchableOpacity style={styles.followButton} onPress={() => {
            ToastAndroid.show('Voce esta sequinto esse usuario!', ToastAndroid.SHORT);
      }}>
        <Text style={styles.followButtonText}>Seguir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Search Users" 
        value={searchQuery} 
        onKeyPress={handleSearch}
        onChangeText={setSearchQuery} 
      />
      <FlatList 
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens no topo
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50, // Para colocar o input no topo
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
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
    backgroundColor: '#1DA1F2',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
