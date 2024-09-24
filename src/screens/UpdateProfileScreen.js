import React, { useContext, useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ContextAuth } from '../context/AuthProvider';
import { api } from '../config/api';

export default function UpdateProfileScreen({ navigation }) {
  const { logout, user } = useContext(ContextAuth);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setNewUsername(user.user_login);
      setNewName(user.name || '');
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!newUsername || !newName || !newPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.patch(`/users/${user.id}`, {
        user: {
          login: newUsername,
          name: newName,
          password: newPassword,
          password_confirmation: newPassword,
        },
      });

      if (response.status === 200) {
        Alert.alert('Usuário atualizado', 'Crie uma nova sessão');
        logout();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const response = await api.delete(`/users/${user.id}`);
              if (response.status === 200) {
                Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
                logout(); // Desloga o usuário após excluir a conta
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível excluir a conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.cancelButton, { backgroundColor: '#28A745', top: 10 }]} onPress={() => logout()}>
        <Text style={styles.cancelButtonText}>Sair da conta</Text>
      </TouchableOpacity>


      <TouchableOpacity style={[styles.cancelButton, { backgroundColor: '#FF0000', marginTop: 20 }]} onPress={handleDeleteAccount}>
        <Text style={styles.cancelButtonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 20,
    textAlign: 'center',
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
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00A999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
