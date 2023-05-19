//screens/Training.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Macrocycle from '../components/Macrocycle';


const Training = ({ navigation }) => {
  const [macrocycles, setMacroCycles] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('macrocycles')
      .onSnapshot((snapshot) => {
        const fetchedMacroCycles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMacroCycles(fetchedMacroCycles);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          navigation.navigate('DisplayMacrocycle', { macrocycleId: item.id });
        }}
      >
        <Macrocycle
          name={item.name}
          mesocycles={item.mesocycles || []}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={macrocycles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
      />
      <Button
        title="Go to Recovery"
        onPress={() => navigation.navigate('Recovery')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default Training;
