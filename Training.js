import React from 'react';
import { View, Text, Button } from 'react-native';

const Training = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Training</Text>
      <Button
        title="Go to Recovery"
        onPress={() => navigation.navigate('Recovery')}
      />
    </View>
  );
};

export default Training;
