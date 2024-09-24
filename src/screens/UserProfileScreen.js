import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateProfileScreen')}>
        <Text style={styles.buttonText}>Alterar Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar ao Feed</Text>
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
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA500', 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
