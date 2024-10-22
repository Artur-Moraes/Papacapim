import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { api } from '../config/api';

export default function ReplyPostScreen({ route, navigation }) {
  const { postId } = route.params; 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!message.trim()) {
      Alert.alert('Erro', 'A resposta não pode estar vazia.');
      return;
    }

    setLoading(true); 

    try {
      const response = await api.post(`/posts/${postId}/replies`, {
        reply: {
          message,
        },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Resposta enviada com sucesso!');
        setMessage(''); 
        navigation.goBack(); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a resposta.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responder Postagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua resposta..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#28A745" />
      ) : (
        <Button title="Enviar Resposta" onPress={handleReply} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#28A745',
  },
  input: {
    height: 100,
    borderColor: '#28A745',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
