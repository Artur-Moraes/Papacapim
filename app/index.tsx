import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Themed';
import axios from 'axios';
import { Link, useNavigation, useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/AuthContext';

type RootStackParamList = {
  Home: undefined; 
};

const LoginScreen: React.FC = () => {
  const [login, setLogin] = useState<string>('mateus50');
  const [password, setPassword] = useState<string>('123456');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken } = useContext(AuthContext);
  const router = useRouter(); // Use o router do Expo Router

  async function handleLogin() {
    if (!login || !password) {
      setError('Preencha todos os campos!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('https://api.papacapim.just.pro.br/login', {
        login,
        password,
      });

      const token = data.token;
      if (token) {
        setToken(token);
        console.log('Token:', token);
        router.push('/(tabs)/');

      } else {
        setError('Token não encontrado na resposta.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
      } else {
        setError('Erro desconhecido. Tente novamente mais tarde.');
      }
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        accessibilityLabel="Login"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Senha"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      <Link href="/signUpScreen" asChild>
        <TouchableOpacity style={styles.signupLink}>
          <Text style={styles.signupText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

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
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  errorContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 4,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
});

export default LoginScreen;
