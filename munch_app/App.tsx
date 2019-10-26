import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MunchServer from './API';

var munch = new MunchServer('yee');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ian is bad really bad oh my god he is so bad</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
