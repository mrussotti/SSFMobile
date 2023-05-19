// DisplayMicrocycle.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Day from '../components/Day';

const DisplayMicrocycle = ({ route, navigation }) => {
  const { macrocycleId, mesocycleId, microcycleId } = route.params;
  const [microcycle, setMicrocycle] = useState(null);
  const [days, setDays] = useState([]);
  const [newDayName, setNewDayName] = useState('');
  const [showNewDayInput, setShowNewDayInput] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchMicrocycle = async () => {
      const microcycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId)
        .collection('mesocycles')
        .doc(mesocycleId)
        .collection('microcycles')
        .doc(microcycleId)
        .get();

      const microcycleData = microcycleDoc.data();
      setMicrocycle(microcycleData);

      const daysCollection = await firebase
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
        .get();

      const daysData = daysCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDays(daysData);
    };

    fetchMicrocycle();
  }, [macrocycleId, mesocycleId, microcycleId]);

  const addNewDay = async () => {
    if (newDayName.trim() === '') {
      return;
    }

    const userId = auth.currentUser.uid;
    const newDayNumber = days.length + 1;

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
        .add({
          name: newDayName,
          number: newDayNumber,
          exercises: [],
        });

      // fetch the updated days
      const daysCollection = await firebase
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
        .get();

      const daysData = daysCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // update local state
      setDays(daysData);

      setNewDayName('');
      setShowNewDayInput(false);
    } catch (error) {
      console.log('Error adding new day:', error);
    }
  };

  return (
    <View style={styles.container}>
      {microcycle && (
        <View>
          <Text>Name: {microcycle.name}</Text>
        </View>
      )}
      <Text style={{ fontSize: 24, marginTop: 20 }}>Days:</Text>
      <FlatList
        data={days}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DisplayDay', {
                macrocycleId,
                mesocycleId,
                microcycleId,
                dayId: item.id,
              })
            }
          >
            <Day
              name={`Day ${item.number}: ${item.name || 'Unnamed'}`}
              exercises={item.exercises || []}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {showNewDayInput ? (
        <View>
          <TextInput
            style={styles.input}
            value={newDayName}
            onChangeText={setNewDayName}
            placeholder="Enter new day name"
          />
          <Button title="Add New Day" onPress={addNewDay} />
          <Button title="Cancel" onPress={() => setShowNewDayInput(false)} />
        </View>
      ) : (
        <Button title="Add New Day" onPress={() => setShowNewDayInput(true)} />
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

export default DisplayMicrocycle;
