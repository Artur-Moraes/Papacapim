import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';

interface Tweet {
  id: string;
  content: string;
  user: {
    username: string;
    name: string;
  };
}

interface User {
  id: string;
  username: string;
  name: string;
}

const FeedScreen: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [searchUser, setSearchUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('https://api.papacapim.just.pro.br/tweets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTweets(response.data);
      } catch (error) {
        console.error('Erro ao buscar tweets:', error);
      }
    };

    fetchTweets();
  }, [token]);

  const handleSearchUser = async () => {
    if (searchUser.trim()) {
      try {
        const response = await axios.get(`https://api.papacapim.just.pro.br/users/search?username=${searchUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    }
  };

  const followUser = async (userId: string) => {
    try {
      await axios.post(`https://api.papacapim.just.pro.br/follow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Usuário seguido com sucesso!');
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      await axios.delete(`https://api.papacapim.just.pro.br/unfollow/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Usuário deixado de seguir!');
    } catch (error) {
      console.error('Erro ao deixar de seguir usuário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar usuário"
        value={searchUser}
        onChangeText={setSearchUser}
      />
      <Button title="Buscar" onPress={handleSearchUser} />

      {users.length > 0 && (
        <View style={styles.userList}>
          {users.map((user) => (
            <View key={user.id} style={styles.userContainer}>
              <Text style={styles.userName}>{user.name} (@{user.username})</Text>
              <TouchableOpacity onPress={() => followUser(user.id)}>
                <Text style={styles.followButton}>Seguir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => unfollowUser(user.id)}>
                <Text style={styles.unfollowButton}>Deixar de seguir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tweetContainer}>
            <Text style={styles.username}>{item.user.name} (@{item.user.username})</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  userList: {
    marginBottom: 16,
  },
  userContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  followButton: {
    color: '#007bff',
    marginLeft: 10,
  },
  unfollowButton: {
    color: '#ff0000',
    marginLeft: 10,
  },
  tweetContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  username: {
    fontWeight: 'bold',
  },
});

export default FeedScreen;
