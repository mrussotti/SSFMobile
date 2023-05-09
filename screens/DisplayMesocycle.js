import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const DisplayMesocycle = ({ route, navigation }) => {
  const { mesocycleId } = route.params;
  const [mesocycle, setMesocycle] = useState(null);
  const [microcycles, setMicrocycles] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchMesocycle = async () => {
      const mesocycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('mesocycles')
        .doc(mesocycleId)
        .get();

      setMesocycle(mesocycleDoc.data());
    };

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('mesocycles')
      .doc(mesocycleId)
      .collection('microcycles')
      .orderBy('number')
      .onSnapshot((snapshot) => {
        const fetchedMicrocycles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMicrocycles(fetchedMicrocycles);
      });

    fetchMesocycle();

    return () => {
      unsubscribe();
    };
  }, [mesocycleId]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
            <View>
              <Text>
                Microcycle {item.number}: {item.name || 'Unnamed'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DisplayMesocycle;
