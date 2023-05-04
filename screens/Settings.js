import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebase';

const Settings = ({ navigation }) => {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>

    <View style={styles.container}>
    <Text> Email: {auth.currentUser?.email} </Text>
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
