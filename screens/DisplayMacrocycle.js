// screens/DisplayMacrocycle.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Mesocycle from '../components/Mesocycle';

const DisplayMacrocycle = ({ route, navigation }) => {
    const { macrocycleId } = route.params;
    const [macrocycle, setMacrocycle] = useState(null);
    const [mesocycles, setMesocycles] = useState([]);
    const [showNewMesocycleInput, setShowNewMesocycleInput] = useState(false);
    const [newMesocycleName, setNewMesocycleName] = useState('');

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

    const addNewMesocycle = async () => {
        if (newMesocycleName.trim() === '') {
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            await firebase
                .firestore()
                .collection('users')
                .doc(userId)
                .collection('macrocycles')
                .doc(macrocycleId)
                .collection('mesocycles')
                .add({
                    name: newMesocycleName,
                    number: mesocycles.length + 1,
                    microcycles: [],
                });

            setNewMesocycleName('');
            setShowNewMesocycleInput(false);
        } catch (error) {
            console.log('Error adding new mesocycle:', error);
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
                            navigation.navigate('DisplayMesocycle', { mesocycleId: item.id, macrocycleId: macrocycleId })
                        }
                    >
                        <Mesocycle
                            name={`Mesocycle ${item.number}: ${item.name || 'Unnamed'}`}
                            microcycles={item.microcycles || []}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
            {showNewMesocycleInput ? (
                <View>
                    <TextInput
                        style={styles.input}
                        value={newMesocycleName}
                        onChangeText={setNewMesocycleName}
                        placeholder="Enter new mesocycle name"
                    />
                    <Button title="Add New Mesocycle" onPress={addNewMesocycle} />
                    <Button title="Cancel" onPress={() => setShowNewMesocycleInput(false)} />
                </View>
            ) : (
                <Button title="Add New Mesocycle" onPress={() => setShowNewMesocycleInput(true)} />
            )}
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

