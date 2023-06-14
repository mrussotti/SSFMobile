//settings.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Settings = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [editMode, setEditMode] = useState(false);

  const navigation2 = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation2.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleSubmit = async () => {
    const userId = auth.currentUser.uid;
    try {
      await firebase.firestore().collection('users').doc(userId).set({
        weight,
        height,
        age,
      }, { merge: true });
      alert('Health data saved successfully!');
      setEditMode(false);
    } catch (error) {
      alert('Error saving health data:', error);
    }
  }

  useEffect(() => {
    const userId = auth.currentUser.uid;
    firebase.firestore().collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          setWeight(doc.data().weight);
          setHeight(doc.data().height);
          setAge(doc.data().age);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>

    <View style={styles.container}>
    <Text> Email: {auth.currentUser?.email} </Text>

    {editMode ? (
      <>
        <TextInput
          placeholder='Weight (lbs)'
          value={ weight }
          onChangeText={text => setWeight(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Height (inches)'
          value={ height }
          onChangeText={text => setHeight(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Age'
          value={ age }
          onChangeText={text => setAge(text)}
          style={styles.input}
        />

        <TouchableOpacity onPress= {handleSubmit} style= {styles.button}>
          <Text style= {styles.buttonText}> Submit</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <Text>Weight: {weight} lbs</Text>
        <Text>Height: {height} inches</Text>
        <Text>Age: {age}</Text>
        <TouchableOpacity onPress={() => setEditMode(true)} style= {styles.button}>
          <Text style= {styles.buttonText}> Edit</Text>
        </TouchableOpacity>
      </>
    )}

    <TouchableOpacity onPress= {handleSignOut} style= {styles.button}>
      <Text style= {styles.buttonText}> Sign Out</Text>
    </TouchableOpacity>
    </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  inputContainer: {
      width: '80%',
  },
  input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
  },
  buttonContainer: {
      width: "60%",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
  },
  button: {
      backgroundColor: "#0782F9",
      width: '100%',
      padding: 15,
      borderRadius:10,
      alignItems: 'center',
  },
  buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
  },
  buttonText:{
      color: 'white',
      fontWeight:'700',
      fontSize: 16,
  },
  buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
  },
});
