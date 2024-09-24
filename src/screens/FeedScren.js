import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('PostScreen')}>
        <Text style={styles.postButtonText}>Escrever Postagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UpdateProfileScreen')}>
        <Text style={styles.profileButtonText}>Ver Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745', // Verde como cor primária
    marginVertical: 20,
    textAlign: 'center',
  },
  postButton: {
    backgroundColor: '#FFA500', // Laranja como cor secundária
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#28A745', // Verde como cor primária
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
