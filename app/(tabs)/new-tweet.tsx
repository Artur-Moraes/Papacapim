import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { View, StyleSheet, Image, TextInput, Pressable, Text, SafeAreaView } from "react-native";
import axios from 'axios';

const user = {
  id: 'u1',
  username: 'ArturMoraes',
  name: 'Artur',
  image: 'https://img.freepik.com/free-vector/new-twitter-x-logo-with-drop-shadow_1017-45419.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid',
};

export default function NewTweet() {
  const [text, setText] = useState<string>('');
  const router = useRouter();
  const token = '12835982-bc61-4f48-9561-ec1471969c6e'; 

  const onTweetPress = async () => {
    try {
      await axios.post('https://api.papacapim.just.pro.br/tweets', {
        content: text,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setText(''); 
      router.back(); 
    } catch (error) {
      console.error('Erro ao postar tweet:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href="../" style={{ fontSize: 18 }}>
            Cancelar
          </Link>
          <Pressable onPress={onTweetPress} style={styles.button}>
            <Text style={styles.buttonText}>Tweet</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <TextInput 
            value={text}
            onChangeText={setText}
            placeholder="What's happening?"
            multiline
            numberOfLines={5}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1C9BF0',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
});
