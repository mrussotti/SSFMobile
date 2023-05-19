// components/Macrocycle.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Mesocycle from './Mesocycle';

const Macrocycle = ({ name, mesocycles }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {mesocycles.map((mesocycle, index) => (
        <Mesocycle key={index} name={mesocycle.name} microcycles={mesocycle.microcycles} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Macrocycle;
