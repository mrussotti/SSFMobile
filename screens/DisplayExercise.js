// DisplayExercise.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const DisplayExercise = ({ route, navigation }) => {
  const { macrocycleId, mesocycleId, microcycleId, dayId, exerciseId } = route.params;
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      const userId = auth.currentUser.uid;
      const exerciseDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId)
        .collection('mesocycles')
        .doc(mesocycleId)
        .collection('microcycles')
        .doc(microcycleId)
        .collection('days')
        .doc(dayId)
        .collection('exercises')
        .doc(exerciseId)
        .get();

      setExercise(exerciseDoc.data());
    };

    fetchExercise();
  }, [macrocycleId, mesocycleId, microcycleId, dayId, exerciseId]);

  const updateExercise = async () => {
    const userId = auth.currentUser.uid;
    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('macrocycles')
      .doc(macrocycleId)
      .collection('mesocycles')
      .doc(mesocycleId)
      .collection('microcycles')
      .doc(microcycleId)
      .collection('days')
      .doc(dayId)
      .collection('exercises')
      .doc(exerciseId)
      .set(exercise);

    // After update navigate back to the 'DisplayDay' page
    navigation.goBack();
  };

  if (!exercise) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={exercise.name}
        onChangeText={(text) => setExercise({ ...exercise, name: text })}
      />

      <Text style={styles.label}>Muscle Groups:</Text>
      <TextInput
        style={styles.input}
        value={exercise.muscleGroups}
        onChangeText={(text) => setExercise({ ...exercise, muscleGroups: text })}
      />

      <Text style={styles.label}>Sets:</Text>
      <TextInput
        style={styles.input}
        value={String(exercise.sets)}
        onChangeText={(text) => setExercise({ ...exercise, sets: Number(text) })}
      />

      <Text style={styles.label}>Reps:</Text>
      <TextInput
        style={styles.input}
        value={String(exercise.reps)}
        onChangeText={(text) => setExercise({ ...exercise, reps: Number(text) })}
      />

      <Text style={styles.label}>Rest Time:</Text>
      <TextInput
        style={styles.input}
        value={exercise.restTime}
        onChangeText={(text) => setExercise({ ...exercise, restTime: text })}
      />

      <Text style={styles.label}>RIR:</Text>
      <TextInput
        style={styles.input}
        value={String(exercise.rir)}
        onChangeText={(text) => setExercise({ ...exercise, rir: text })}
      />

      <Button title="Update Exercise" onPress={updateExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
  },
});

export default DisplayExercise;
