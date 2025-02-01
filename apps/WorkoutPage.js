import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView,SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as CalendarAPI from 'expo-calendar';

function WorkoutPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [workouts, setWorkouts] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    machine: '',
    sets: '',
    reps: '',
    warmUpWeight: '',
    finalWeight: ''
  });

  useEffect(() => {
    (async () => {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const updatedWorkouts = {
      ...workouts,
      [selectedDate]: [...(workouts[selectedDate] || []), form]
    };
    setWorkouts(updatedWorkouts);
    setForm({
      title: '',
      machine: '',
      sets: '',
      reps: '',
      warmUpWeight: '',
      finalWeight: ''
    });
    setShowForm(false);
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#0F172A', }}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Workout Page</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#38BDF8' }
        }}
        theme={{
          calendarBackground: '#1E293B',
          textSectionTitleColor: '#94A3B8',
          selectedDayBackgroundColor: '#38BDF8',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#38BDF8',
          dayTextColor: '#ffffff',
          textDisabledColor: '#3B4252',
          monthTextColor: '#ffffff',
          arrowColor: '#38BDF8',
          indicatorColor: '#38BDF8',
        }}
      />
      <Button title="Add Workout" onPress={() => setShowForm(!showForm)} />
      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Title (e.g., Upper Body, Leg Day)"
            placeholderTextColor="#A0AEC0"
            value={form.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Machine (e.g., Leg Press, Bench Press)"
            placeholderTextColor="#A0AEC0"
            value={form.machine}
            onChangeText={(text) => handleInputChange('machine', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            placeholderTextColor="#A0AEC0"
            value={form.sets}
            onChangeText={(text) => handleInputChange('sets', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            placeholderTextColor="#A0AEC0"
            value={form.reps}
            onChangeText={(text) => handleInputChange('reps', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Warm Up Weight"
            placeholderTextColor="#A0AEC0"
            value={form.warmUpWeight}
            onChangeText={(text) => handleInputChange('warmUpWeight', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Final Weight"
            placeholderTextColor="#A0AEC0"
            value={form.finalWeight}
            onChangeText={(text) => handleInputChange('finalWeight', text)}
          />
          <Button title="Save Workout" onPress={handleSubmit} />
        </View>
      )}
      <View style={styles.workoutList}>
        {workouts[selectedDate] && workouts[selectedDate].map((workout, index) => (
          <View key={index} style={styles.workoutItem}>
            <Text style={styles.workoutText}>Title: {workout.title}</Text>
            <Text style={styles.workoutText}>Machine: {workout.machine}</Text>
            <Text style={styles.workoutText}>Sets: {workout.sets}</Text>
            <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
            <Text style={styles.workoutText}>Warm Up Weight: {workout.warmUpWeight}</Text>
            <Text style={styles.workoutText}>Final Weight: {workout.finalWeight}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3B4252',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  workoutList: {
    marginTop: 20,
  },
  workoutItem: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutText: {
    color: '#A0AEC0',
    marginBottom: 5,
  },
});

export default WorkoutPage;