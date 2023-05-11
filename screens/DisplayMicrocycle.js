//screens/DisplayMicrocycle.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const DisplayMicrocycle = ({ route }) => {
  const { microcycleId } = route.params;
  const [microcycle, setMicrocycle] = useState(null);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const fetchMicrocycle = async () => {
      const microcycleDoc = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('microcycles')
        .doc(microcycleId)
        .get();

      setMicrocycle(microcycleDoc.data());
    };

    fetchMicrocycle();
  }, [microcycleId]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {microcycle && (
        <View>
          <Text>Name: {microcycle.name}</Text>
          <Text>Start Date: {microcycle.startDate}</Text>
          <Text>End Date: {microcycle.endDate}</Text>
        </View>
      )}
    </View>
  );
};

export default DisplayMicrocycle;
