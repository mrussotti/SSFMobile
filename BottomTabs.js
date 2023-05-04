import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Training from './screens/Training';
import Recovery from './screens/Recovery';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Training"
        component={Training}
        options={{
          headerTitle: 'Training',
          headerRight: () => (
            <Ionicons
              name="settings"
              size={25}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recovery"
        component={Recovery}
        options={{
          headerTitle: 'Recovery',
          headerRight: () => (
            <Ionicons
              name="settings"
              size={25}
              color="black"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;