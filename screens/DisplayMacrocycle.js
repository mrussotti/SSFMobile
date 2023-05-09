import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const DisplayMacrocycle = ({ route, navigation }) => {
    const { macrocycleId } = route.params;
    const [macrocycle, setMacrocycle] = useState(null);
    const [mesocycles, setMesocycles] = useState([]);
    const [numMesocycles, setNumMesocycles] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const addMesocycles = async () => {
        if (numMesocycles.trim() === '' || isNaN(numMesocycles) || Number(numMesocycles) < 1) {
            setErrorMessage('Please enter a valid number of mesocycles.');
            return;
        }

        const macrocycleRef = firebase.firestore().collection('users').doc(auth.currentUser.uid).collection('macrocycles').doc(macrocycleId);

        try {
            for (let i = 1; i <= numMesocycles; i++) {
                await macrocycleRef.collection('mesocycles').add({ number: i });
            }
        } catch (error) {
            console.log('Error adding mesocycles:', error);
            setErrorMessage('Error adding mesocycles. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DisplayMesocycle', { mesocycleId: item.id })
            }
          >
            <View>
              <Text>
                Mesocycle {item.number}: {item.name || 'Unnamed'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
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
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default DisplayMacrocycle;
