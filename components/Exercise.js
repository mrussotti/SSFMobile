import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Exercise = ({ name, muscleGroups, sets, reps, restTime, rir }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>Muscle groups: {muscleGroups}</Text>
      <Text style={styles.details}>Sets: {sets}</Text>
      <Text style={styles.details}>Reps: {reps}</Text>
      <Text style={styles.details}>Rest time: {restTime}</Text>
      <Text style={styles.details}>RIR: {rir}</Text>
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
  },
  details: {
    fontSize: 16,
  },
});

export default Exercise;
