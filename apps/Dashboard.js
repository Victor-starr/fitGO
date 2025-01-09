// filepath: /c:/Users/vikto/Desktop/fitgo/apps/LogPage.js
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Page</Text>
    </View>
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

export default Dashboard;