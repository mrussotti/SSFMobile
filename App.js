import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Training from './screens/Training';
import Recovery from './screens/Recovery';
import Settings from './screens/Settings';
import Login from './screens/login';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Login"
    screenOptions={{
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Login"
      component={Login}
      options={({ navigation }) => ({
        headerTitle: 'Login',
        headerRight: () => (
          <Ionicons
            name="settings"
            size={25}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Settings')}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Training"
      component={Training}
      options={({ navigation }) => ({
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
      })}
    />
    <Tab.Screen
      name="Recovery"
      component={Recovery}
      options={({ navigation }) => ({
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
      })}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Go Back"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
