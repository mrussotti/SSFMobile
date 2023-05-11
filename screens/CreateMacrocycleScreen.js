//screens/CreateMacrocycleScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const CreateMacrocycleScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createMacrocycle = async () => {
    if (name.trim() === '') {
      setErrorMessage('Please enter a name for the macrocycle.');
      return;
    }
  
    if (startDate.trim() === '' || endDate.trim() === '') {
      setErrorMessage('Please enter start and end dates for the macrocycle.');
      return;
    }
  
    try {
      const userId = auth.currentUser.uid;
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('macrocycles')
        .add({ name, startDate, endDate, mesocycles: [] });
  
      navigation.goBack();
    } catch (error) {
      console.log('Error creating macrocycle:', error);
      setErrorMessage('Error creating macrocycle. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter macrocycle name"
      />
      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="Enter start date (YYYY-MM-DD)"
      />
      <Text style={styles.label}>End Date</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="Enter end date (YYYY-MM-DD)"
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Create Macrocycle" onPress={createMacrocycle} />
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

export default CreateMacrocycleScreen;