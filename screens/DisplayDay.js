// DisplayDay.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Exercise from '../components/Exercise';

const DisplayDay = ({ route, navigation }) => {
  const { macrocycleId, mesocycleId, microcycleId, dayId } = route.params;
  const [day, setDay] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [showNewExerciseInput, setShowNewExerciseInput] = useState(false);


  

  useEffect(() => {
    const fetchDay = async () => {
      const userId = auth.currentUser.uid;
      const dayDoc = await firebase
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
        .get();

      setDay(dayDoc.data());

      const exercisesCollection = await firebase
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
        .get();

      setExercises(exercisesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchDay();
  }, [macrocycleId, mesocycleId, microcycleId, dayId]);

  const addNewExercise = async () => {
    if (newExerciseName.trim() === '') return;

    const userId = auth.currentUser.uid;

    try {
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
        .add({
          name: newExerciseName,
          // Add any other necessary properties here
        });

      const exercisesCollection = await firebase
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
        .get();

      setExercises(exercisesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setNewExerciseName('');
      setShowNewExerciseInput(false);
    } catch (error) {
      console.log('Error adding new exercise:', error);
    }
  };

  return (
    <View style={styles.container}>
      {day && <Text>Name: {day.name}</Text>}
      <Text style={{ fontSize: 24, marginTop: 20 }}>Exercises:</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DisplayExercise', {
                macrocycleId,
                mesocycleId,
                microcycleId,
                dayId,
                exerciseId: item.id,
              })
            }
          >
            <Exercise
              name={item.name || 'Unnamed'}
              muscleGroups={item.muscleGroups || 'None'}
              sets={item.sets || 0}
              reps={item.reps || 0}
              restTime={item.restTime || 'None'}
              rir={item.rir || 'None'}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {showNewExerciseInput ? (
        <View>
          <TextInput
            style={styles.input}
            value={newExerciseName}
            onChangeText={setNewExerciseName}
            placeholder="Enter new exercise name"
          />
          <Button title="Add New Exercise" onPress={addNewExercise} />
          <Button title="Cancel" onPress={() => setShowNewExerciseInput(false)} />
        </View>
      ) : (
        <Button title="Add New Exercise" onPress={() => setShowNewExerciseInput(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
});

export default DisplayDay;
