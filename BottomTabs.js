import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Training from './screens/Training';
import Recovery from './screens/Recovery';
import CreateMacrocycleScreen from './screens/CreateMacrocycleScreen';
import DisplayMacrocycle from './screens/DisplayMacrocycle';
import DisplayMesocycle from './screens/DisplayMesocycle'; // Add this line
import { Ionicons } from '@expo/vector-icons';
import DisplayMicrocycle from './screens/DisplayMicrocycle';
import DisplayDay from './screens/DisplayDay';
import DisplayExercise from './screens/DisplayExercise';



const Tab = createBottomTabNavigator();
const TrainingStack = createStackNavigator();
const RecoveryStack = createStackNavigator();

const TrainingStackNavigator = () => {
  return (
    <TrainingStack.Navigator>
      <TrainingStack.Screen
        name="TrainingStack"
        component={Training}
        options={({ navigation }) => ({
          headerTitle: 'Training',
          headerLeft: () => (
            <Ionicons
              name="add"
              size={25}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('CreateMacrocycle')}
            />
          ),
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
      <TrainingStack.Screen
        name="CreateMacrocycle"
        component={CreateMacrocycleScreen}
        options={{ title: 'Create Macrocycle' }}
      />
      <TrainingStack.Screen
        name="DisplayMacrocycle"
        component={DisplayMacrocycle}
        options={{ title: 'Display Macrocycle' }}
      />
      <TrainingStack.Screen
        name="DisplayMesocycle"
        component={DisplayMesocycle}
        options={{ title: 'Display Mesocycle' }}
      />
      <TrainingStack.Screen // Add this block
        name="DisplayMicrocycle"
        component={DisplayMicrocycle}
        options={{ title: 'Display Microcycle' }}
      />
      <TrainingStack.Screen // Add this block
        name="DisplayDay"
        component={DisplayDay}
        options={{ title: 'Display Day' }}
      />
      <TrainingStack.Screen // Add this block
        name="DisplayExercise"
        component={DisplayExercise}
        options={{ title: 'Display Exercise' }}
      />
    </TrainingStack.Navigator>
  );
};


const RecoveryStackNavigator = () => {
  return (
    <RecoveryStack.Navigator>
      <RecoveryStack.Screen
        name="RecoveryStack"
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
    </RecoveryStack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Training"
        component={TrainingStackNavigator}
        options={{ tabBarLabel: 'Training' }}
      />
      <Tab.Screen
        name="Recovery"
        component={RecoveryStackNavigator}
        options={{ tabBarLabel: 'Recovery' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
