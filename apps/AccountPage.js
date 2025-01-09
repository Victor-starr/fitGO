// filepath: /c:/Users/vikto/Desktop/fitgo/apps/AccountPage.js
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AccountPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Page</Text>
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

export default AccountPage;