// filepath: /c:/Users/vikto/Desktop/fitgo/apps/CalendarPage.js
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CalendarPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar Page</Text>
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

export default CalendarPage;