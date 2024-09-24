import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});
  const { token } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.papacapim.just.pro.br/users/search?query=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const toggleFollow = async (userId: string) => {
    try {
      if (following[userId]) {
        await axios.post(`https://api.papacapim.just.pro.br/users/unfollow/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowing((prev) => ({ ...prev, [userId]: false }));
      } else {
        // Seguir
        await axios.post(`https://api.papacapim.just.pro.br/users/follow/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowing((prev) => ({ ...prev, [userId]: true }));
      }
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar usuários"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text>{item.name} (@{item.username})</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={styles.buttonText}>
                {following[item.id] ? 'Deixar de seguir' : 'Seguir'}
              </Text>
            </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  resultContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1C9BF0',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SearchScreen;
