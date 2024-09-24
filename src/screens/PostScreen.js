import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { api } from '../config/api';

export default function NewPostScreen({ navigation }) {
  const [message, setMessage] = useState('');

  const handleCreatePost = async () => {
    if (!message.trim()) {
      Alert.alert('Erro', 'A postagem não pode estar vazia.');
      return;
    }

    try {
      const response = await api.post('/posts', {
        post: {
          message: message,
        },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Postagem criada com sucesso!');
        navigation.goBack(); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a postagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escrever Nova Postagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={setMessage}
        multiline={true}
      />
      <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
        <Text style={styles.postButtonText}>Postar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745', 
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderColor: '#28A745', 
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top', 
  },
  postButton: {
    backgroundColor: '#FFA500', 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
