import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import { Entypo } from '@expo/vector-icons';

export default function UserProfileScreen() {
  // Mock user data
  const user = {
    name: 'Artur',
    email: 'artur.moraes@gmail.com',
    bio: 'Desenvolvedor de software. Apaixonado por tecnologia e inovação.',
  };

  return (
    <View style={styles.page}>
      <View style={styles.profileHeader}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userBio}>{user.bio}</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButton} accessibilityRole="button" accessibilityLabel="Compose new tweet">
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 18,
    color: '#555',
  },
  userBio: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#1C9BF0',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',
    borderRadius: 50,
    padding: 15,
    position: 'absolute',
    right: 15,
    bottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
