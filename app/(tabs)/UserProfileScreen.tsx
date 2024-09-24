import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';

const UserProfileScreen: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null); // Limpa o erro antes de tentar buscar

      try {
        const response = await axios.get(`https://api.papacapim.just.pro.br/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setError('Erro ao carregar perfil. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, token]);

  const handleFollow = async () => {
    try {
      await axios.post(`https://api.papacapim.just.pro.br/users/${userId}/follow`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsFollowing(true);
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
      setError('Erro ao seguir usuário. Tente novamente mais tarde.');
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`https://api.papacapim.just.pro.br/users/${userId}/follow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsFollowing(false);
    } catch (error) {
      console.error('Erro ao deixar de seguir usuário:', error);
      setError('Erro ao deixar de seguir usuário. Tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user.name} (@{user.username})</Text>
      {user.bio && <Text>Bio: {user.bio}</Text>} 
      <TouchableOpacity 
        style={styles.button} 
        onPress={isFollowing ? handleUnfollow : handleFollow}
      >
        <Text style={styles.buttonText}>{isFollowing ? 'Deixar de Seguir' : 'Seguir'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc3545',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default UserProfileScreen;
