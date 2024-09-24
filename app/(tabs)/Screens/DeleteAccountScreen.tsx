import React, { useContext } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/app/AuthContext';

const DeleteAccountScreen: React.FC = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('https://api.papacapim.just.pro.br/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null); 
      Alert.alert('Conta excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      Alert.alert('Erro ao excluir conta. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Excluir Conta" color="red" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default DeleteAccountScreen;
