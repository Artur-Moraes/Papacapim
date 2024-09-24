import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Use o router do Expo Router
  const { token } = useContext(AuthContext);

  async function handleSignup() {
    if (!name || !login || !password || !confirmPassword) {
      setError('Preencha todos os campos!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Senhas diferentes!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://api.papacapim.just.pro.br/users', {
        user: {
          login,
          name,
          password,
          password_confirmation: confirmPassword,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      router.push('/');
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Erro ao fazer cadastro!');
      } else {
        setError('Erro desconhecido. Tente novamente mais tarde.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Nome"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Senha"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        accessibilityLabel="Confirmar Senha"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
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
