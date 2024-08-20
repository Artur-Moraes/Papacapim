import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import tweets from '@/assets/data/tweets';
import Tweet from '@/components/Tweet'; // Ajuste feito aqui
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function IndexScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />

      <Link href="/new-tweet" style={styles.floatingButton} accessibilityRole="button" accessibilityLabel="Compose new tweet">
        <Entypo name="plus" size={24} color="white" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
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
