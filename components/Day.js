// components/Day.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Exercise from './Exercise';

const Day = ({ name, exercises }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {exercises.map((exercise, index) => (
        <Exercise key={index} name={exercise.name} />
      ))}
    </View>
  );
};

Day.defaultProps = {
  exercises: [],
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

export default Day;
