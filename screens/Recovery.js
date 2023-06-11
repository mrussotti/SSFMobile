// Recovery.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import SleepTracker from '../components/SleepTracker';
import CalorieTracker from '../components/CalorieTracker';


const Recovery = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Recovery</Text>
      <SleepTracker />
      <CalorieTracker />

      <Button
        title="Go back to Training"
        onPress={() => navigation.navigate('Training')}
      />
    </View>
  );
};

export default Recovery;
