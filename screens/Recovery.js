//recovery.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const Recovery = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Recovery</Text>
      <Button
        title="Go back to Training"
        onPress={() => navigation.navigate('Training')}
      />
    </View>
  );
};

export default Recovery;
