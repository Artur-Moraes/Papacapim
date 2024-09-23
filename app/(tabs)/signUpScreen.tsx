import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import axios from 'axios';

export default function SignupScreen() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  async function handlesubmit (){
    if (name === '' || email === '' || password === '' || confirmPassword === ''){
      setError('Preencha todos os campos!')
      return
    }
    if (password != confirmPassword ){
      setError('Senha diferentes!')
      return
    }
    const response = await axios.post('https://api.papacapim.just.pro.br:8000/users',{
      "user": {
        "login": email,
        "name": name,
        "password": password,
        "password_confirmation": confirmPassword
      }
    })
    console.log(response.data)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />     
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )} */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handlesubmit}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
