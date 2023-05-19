// components/Microcycle.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Day from './Day';

const Microcycle = ({ name, days }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {days.map((day, index) => (
        <Day key={index} name={`Day ${day.number}: ${day.name || 'Unnamed'}`} exercises={day.exercises} />
      ))}
    </View>
  );
};

Microcycle.defaultProps = {
  days: [],
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

export default Microcycle;
