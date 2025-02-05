import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

function WorkoutPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [workouts, setWorkouts] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    machine: '',
    sets: '',
    reps: '',
    warmUpWeight: '',
    finalWeight: ''
  });

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setShowForm(false); // Hide the form when switching dates
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const updatedWorkouts = {
      ...workouts,
      [selectedDate]: [...(workouts[selectedDate] || []), form],
    };
    setWorkouts(updatedWorkouts);
    setForm({
      machine: '',
      sets: '',
      reps: '',
      warmUpWeight: '',
      finalWeight: ''
    });
    setShowForm(false);
  };

  const getMarkedDates = () => {
    const markedDates = {};
    Object.keys(workouts).forEach((date) => {
      markedDates[date] = { marked: true };
    });
    if (selectedDate) {
      markedDates[selectedDate] = { selected: true, selectedColor: '#38BDF8' };
    }
    return markedDates;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F172A' }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Workout Page</Text>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={getMarkedDates()}
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
            <Text style={styles.label}>Machine</Text>
            <TextInput
              style={styles.input}
              placeholder="Machine"
              placeholderTextColor="#94A3B8"
              value={form.machine}
              onChangeText={(value) => handleInputChange('machine', value)}
            />
            <Text style={styles.label}>Sets</Text>
            <TextInput
              style={styles.input}
              placeholder="Sets"
              placeholderTextColor="#94A3B8"
              value={form.sets}
              onChangeText={(value) => handleInputChange('sets', value)}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Reps</Text>
            <TextInput
              style={styles.input}
              placeholder="Reps"
              placeholderTextColor="#94A3B8"
              value={form.reps}
              onChangeText={(value) => handleInputChange('reps', value)}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Warm Up Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Warm Up Weight"
              placeholderTextColor="#94A3B8"
              value={form.warmUpWeight}
              onChangeText={(value) => handleInputChange('warmUpWeight', value)}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Final Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Final Weight"
              placeholderTextColor="#94A3B8"
              value={form.finalWeight}
              onChangeText={(value) => handleInputChange('finalWeight', value)}
              keyboardType="numeric"
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
        <View style={styles.workoutList}>
          {workouts[selectedDate] && workouts[selectedDate].map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <Text style={styles.workoutText}>Machine: {workout.machine}</Text>
              <Text style={styles.workoutText}>Sets: {workout.sets}</Text>
              <Text style={styles.workoutText}>Reps: {workout.reps}</Text>
              <Text style={styles.workoutText}>Warm Up Weight: {workout.warmUpWeight} kg</Text>
              <Text style={styles.workoutText}>Final Weight: {workout.finalWeight} kg</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
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
    height: 40,
  },
  label: {
    color: '#94A3B8',
    marginBottom: 5,
  },
  workoutList: {
    marginTop: 20,
  },
  workoutItem: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  workoutText: {
    color: '#A0AEC0',
    marginBottom: 5,
  },
});

export default WorkoutPage;