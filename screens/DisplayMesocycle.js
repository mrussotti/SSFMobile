import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Microcycle from '../components/Microcycle';

const DisplayMesocycle = ({ route, navigation }) => {
  const { macrocycleId, mesocycleId } = route.params;
  const [mesocycle, setMesocycle] = useState(null);
  const [microcycles, setMicrocycles] = useState([]);
  const [newMicrocycleName, setNewMicrocycleName] = useState('');
  const [showNewMicrocycleInput, setShowNewMicrocycleInput] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchMesocycle = async () => {
      const mesocycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId) // you might need to pass this from DisplayMacrocycle
        .collection('mesocycles')
        .doc(mesocycleId)
        .get();

      const mesocycleData = mesocycleDoc.data();
      setMesocycle(mesocycleData);
      setMicrocycles(mesocycleData.microcycles || []);
    };

    fetchMesocycle();
  }, [mesocycleId]);

  const addNewMicrocycle = async () => {
    if (newMicrocycleName.trim() === '') {
      return;
    }
  
    const userId = auth.currentUser.uid;
    const newMicrocycleNumber = microcycles.length + 1;
  
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId) // you might need to pass this from DisplayMacrocycle
        .collection('mesocycles')
        .doc(mesocycleId)
        .update({
          microcycles: firebase.firestore.FieldValue.arrayUnion({
            name: newMicrocycleName,
            number: newMicrocycleNumber,
            Days: [],
          }),
        });
  
      // fetch the updated mesocycle
      const mesocycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId) // you might need to pass this from DisplayMacrocycle
        .collection('mesocycles')
        .doc(mesocycleId)
        .get();
  
      const mesocycleData = mesocycleDoc.data();
  
      // update local state
      setMicrocycles(mesocycleData.microcycles || []);
      
      setNewMicrocycleName('');
      setShowNewMicrocycleInput(false);
    } catch (error) {
      console.log('Error adding new microcycle:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {mesocycle && (
        <View>
          <Text>Name: {mesocycle.name}</Text>
        </View>
      )}
      <Text style={{ fontSize: 24, marginTop: 20 }}>Microcycles:</Text>
      <FlatList
        data={microcycles}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DisplayMicrocycle', { microcycleId: item.id })
            }
          >
            <Microcycle
              name={`Microcycle ${item.number}: ${item.name || 'Unnamed'}`}
              Days={item.Days || []} // Pass Days if it exists, or an empty array otherwise
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {showNewMicrocycleInput ? (
        <View>
          <TextInput
            style={styles.input}
            value={newMicrocycleName}
            onChangeText={setNewMicrocycleName}
            placeholder="Enter new microcycle name"
          />
          <Button title="Add New Microcycle" onPress={addNewMicrocycle} />
          <Button          title="Cancel" onPress={() => setShowNewMicrocycleInput(false)} />
        </View>
      ) : (
        <Button title="Add New Microcycle" onPress={() => setShowNewMicrocycleInput(true)} />
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

export default DisplayMesocycle;

