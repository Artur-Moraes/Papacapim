import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { api } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextAuth } from '../context/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(ContextAuth);

  
  const handleLogin = async () => {
    try {
      const response = await api.post('/sessions', {
        login: username,
        password: password,
      });
      await AsyncStorage.setItem("token", response.data.token)
      await AsyncStorage.setItem("user", JSON.stringify(response.data))

      console.log(response.data);
      setUser(response.data)

      if (response.status === 201) {
        navigation.navigate('FeedScreen');
      }
    } catch (error) {
      
      alert("Ocorreu um erro interno")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Papacapim</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', 
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#28A745', 
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F0FFF0', 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFA500', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#28A745', 
    marginTop: 15,
  },
});

