import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function PostScreen({ navigation }) {
  const [post, setPost] = useState(''); // Post original
  const [comment, setComment] = useState(''); // Comentário atual
  const [comments, setComments] = useState([]); // Lista de comentários

  const handlePost = () => {
    if (post.trim()) {
      alert('Postagem criada!');
      setPost('');
      setComments([]);
      navigation.goBack();
    } else {
      alert('A postagem não pode estar vazia.');
    }
  };

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    } else {
      alert('O comentário não pode estar vazio.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput 
          style={styles.textArea}
          placeholder="Escreva sua postagem..." 
          value={post} 
          onChangeText={setPost} 
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handlePost}>
          <Text style={styles.buttonText}>Postar</Text>
        </TouchableOpacity>
      </View>

      {/* Campo para comentários */}
      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Comentários</Text>
        <TextInput 
          style={styles.commentInput} 
          placeholder="Escreva um comentário..." 
          value={comment} 
          onChangeText={setComment} 
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleComment}>
          <Text style={styles.buttonText}>Comentar</Text>
        </TouchableOpacity>

        {/* Listagem de comentários */}
        {comments.length > 0 && (
          <View style={styles.commentsList}>
            {comments.map((cmt, index) => (
              <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentText}>{cmt}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    paddingHorizontal: 20,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFA500', // Laranja como cor secundária
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  commentSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#28A745', // Verde como cor primária
  },
  commentInput: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  commentsList: {
    marginTop: 10,
  },
  commentContainer: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
});
