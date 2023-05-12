import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Exercise from '../components/Exercise';

const DisplayDay = ({ route }) => {
  const { macrocycleId, mesocycleId, microcycleId, dayId } = route.params;
  const [day, setDay] = useState(null);
  const [exercises, setExercises] = useState([]);

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
      setExercises(dayData.exercises || []);
    };

    fetchDay();
  }, [macrocycleId, mesocycleId, microcycleId, dayId]);

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
          <Exercise name={item.name || 'Unnamed'} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default DisplayDay;
