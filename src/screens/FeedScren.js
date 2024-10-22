import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import { api } from '../config/api';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyMessage, setReplyMessage] = useState(''); // Estado para a mensagem de resposta
  const [replyPostId, setReplyPostId] = useState(null); // Estado para o ID da postagem a ser respondida

  const fetchPosts = async (searchQuery = '') => {
    setLoading(true);
    try {
      const response = await api.get('/posts', { params: { search: searchQuery } });
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as postagens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.isLiked;
    const endpoint = isLiked ? `/posts/${postId}/likes` : `/posts/${postId}/likes`; // Verifique se a lógica aqui está correta.

    try {
      await api.post(endpoint);
      setPosts(prevPosts => prevPosts.map(p => 
        p.id === postId ? { ...p, isLiked: !isLiked, likes: isLiked ? p.likes - 1 : p.likes + 1 } : p
      ));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível alterar a curtida.');
    }
  };

  const deletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      Alert.alert('Sucesso', 'Postagem excluída com sucesso.');
      fetchPosts();  
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir a postagem.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleReply = async (postId) => {
    if (!replyMessage) {
      Alert.alert('Erro', 'Digite uma mensagem para responder.');
      return;
    }

    try {
      const response = await api.post(`/posts/${postId}/replies`, {
        reply: {
          message: replyMessage,
        },
      });
      
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            return { ...post, replies: [...(post.replies || []), response.data] };
          }
          return post;
        });
      });

      setReplyMessage(''); // Limpa o campo de entrada
      setReplyPostId(null); // Reseta o ID da postagem respondida
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível responder à postagem.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.user_login}</Text>
      <Text style={styles.message}>{item.message}</Text>
  
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeButton}>
            {item.isLiked ? 'Descurtir' : 'Curtir'} ({item.likesCount})
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => {
            setReplyPostId(item.id); // Define o postId para responder
            setReplyMessage(''); // Limpa o campo de resposta
            navigation.navigate('ReplyPostScreen', { postId: item.id }); // Navega para a tela de resposta
        }}>
          <Text style={styles.replyButton}>Responder</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => deletePost(item.id)}>
          <Text style={styles.deleteButton}>Excluir</Text>
        </TouchableOpacity>
      </View>

      {replyPostId === item.id && (
        <TextInput
          style={styles.replyInput}
          placeholder="Digite sua resposta..."
          value={replyMessage}
          onChangeText={setReplyMessage}
          onSubmitEditing={() => handleReply(item.id)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar postagens..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={() => fetchPosts(searchTerm)}  
      />

      {loading ? (
        <ActivityIndicator size="large" color="#28A745" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.noPosts}>Nenhuma postagem disponível.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#28A745" />}
        />
      )}

      <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('PostScreen')}>
        <Text style={styles.postButtonText}>Escrever Postagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745',
    marginVertical: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#28A745',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#28A745',
    borderWidth: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    color: '#28A745',
  },
  replyButton: {
    color: '#FFA500',
  },
  deleteButton: {
    color: '#FF0000',
  },
  replyInput: {
    height: 40,
    borderColor: '#28A745',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  noPosts: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  postButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
