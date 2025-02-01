import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {StyleSheet } from 'react-native';

import Dashboard from '../apps/Dashboard';
import CalendarPage from '../apps/CalendarPage.js';
import WorkoutPage from '../apps/WorkoutPage.js';
import AccountPage from '../apps/AccountPage.js';
import LogPage from '../apps/LogPage.js';
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarItemStyle:{
          backgroundColor: '#1E293B',
          height: 160,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch(route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Calendar':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
              case 'Nutritions':
                iconName = 'add';
                break;
            case 'Workout':
              iconName = focused ? 'barbell' : 'barbell-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          color: '#94A3B8',
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
       <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Workout" component={WorkoutPage} options={{ tabBarLabel: 'Workout' }} />
      <Tab.Screen
        name="Nutritions"
        component={LogPage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <LinearGradient style={styles.customButton}colors={['#0900FF', '#5539BA']}>
              <Ionicons name="add" size={35} color="white" />
            </LinearGradient>
          ),
        }}
      />
        <Tab.Screen name="Calendar" component={CalendarPage} options={{ tabBarLabel: 'Calendar' }} />
      <Tab.Screen name="Account" component={AccountPage} options={{ tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default BottomTabNavigator;