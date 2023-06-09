// components/Mesocycle.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Microcycle from './Microcycle';

const Mesocycle = ({ name, microcycles }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {microcycles.map((microcycle, index) => (
        <Microcycle key={index} name={`Microcycle ${microcycle.number}: ${microcycle.name || 'Unnamed'}`} />
      ))}
    </View>
  );
};

Mesocycle.defaultProps = {
  microcycles: [],
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
  },
});

export default Mesocycle;
