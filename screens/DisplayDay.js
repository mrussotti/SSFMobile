import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Exercise from '../components/Exercise';

const DisplayDay = ({ route }) => {
    const { macrocycleId, mesocycleId, microcycleId, dayId } = route.params;
    const [day, setDay] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [showNewExerciseInput, setShowNewExerciseInput] = useState(false);


    useEffect(() => {
        const userId = auth.currentUser.uid;
        const fetchDay = async () => {
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

            const dayData = dayDoc.data();
            setDay(dayData);

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

            const exercisesData = exercisesCollection.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setExercises(exercisesData);
        };

        fetchDay();
    }, [macrocycleId, mesocycleId, microcycleId, dayId]);

    const addNewExercise = async () => {
        if (newExerciseName.trim() === '') {
            return;
        }

        const userId = auth.currentUser.uid;
        const newExerciseNumber = exercises.length + 1;

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
                    number: newExerciseNumber,
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

            const exercisesData = exercisesCollection.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setExercises(exercisesData);
            setNewExerciseName('');
            setShowNewExerciseInput(false);

        } catch (error) {
            console.log('Error adding new exercise:', error);
        }
    };

    return (
        <View style={styles.container}>
            {day && (
                <View>
                    <Text>Name: {day.name}</Text>
                </View>
            )}
            <Text style={{ fontSize: 24, marginTop: 20 }}>Exercises:</Text>
            <FlatList
                data={exercises}
                renderItem={({ item }) => (
                    <Exercise
                        name={item.name || 'Unnamed'}
                        muscleGroups={item.muscleGroups || 'None'}
                        sets={item.sets || 0}
                        reps={item.reps || 0}
                        restTime={item.restTime || 'None'}
                        rir={item.rir || 'None'}
                    />
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
