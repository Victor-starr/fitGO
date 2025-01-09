// filepath: /c:/Users/vikto/Desktop/fitgo/apps/LogPage.js
import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function LogPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Log In Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LogPage;