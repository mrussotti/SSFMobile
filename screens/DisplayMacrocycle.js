import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const DisplayMacrocycle = ({ route }) => {
  const { macrocycleId } = route.params;
  const [macrocycle, setMacrocycle] = useState(null);
  const [mesocycles, setMesocycles] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchMacrocycle = async () => {
      const macrocycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .doc(macrocycleId)
        .get();

      setMacrocycle(macrocycleDoc.data());
    };

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('macrocycles')
      .doc(macrocycleId)
      .collection('mesocycles')
      .orderBy('number')
      .onSnapshot((snapshot) => {
        const fetchedMesocycles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMesocycles(fetchedMesocycles);
      });

    fetchMacrocycle();

    return () => {
      unsubscribe();
    };
  }, [macrocycleId]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {macrocycle && (
        <View>
          <Text>Name: {macrocycle.name}</Text>
          <Text>Start Date: {macrocycle.startDate}</Text>
          <Text>End Date: {macrocycle.endDate}</Text>
        </View>
      )}
      <Text style={{ fontSize: 24, marginTop: 20 }}>Mesocycles:</Text>
      <FlatList
        data={mesocycles}
        renderItem={({ item }) => (
          <View>
            <Text>
              Mesocycle {item.number}: {item.name || 'Unnamed'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DisplayMacrocycle;
