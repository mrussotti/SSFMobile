//login.js
import React, {useState, useEffect} from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {auth} from '../firebase';
import { useNavigation } from '@react-navigation/native';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const navigation2 = useNavigation();


    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                navigation2.replace("Training")
            }
        })
        return unsubscribe
    }, [])

    const saveUserData = async (userId) => {
        try {
          await db.collection('users').doc(userId).set({
            macrocycles: [],
          });
        } catch (error) {
          console.log('Error saving user data:', error);
        }
      };

    const handleSignUp = async () => {
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage('Please enter your email and password.');
            return;
          }
      
          try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            await saveUserData(result.user.uid);
            setErrorMessage('');
          } catch (error) {
            setErrorMessage('Error signing up. Please try again.');
          }
        };

    

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage('Please enter your email and password.');
            return;
          }
      
          try {
            await auth.signInWithEmailAndPassword(email, password);
            setErrorMessage('');
          } catch (error) {
            setErrorMessage('Error signing in. Please try again.');
          }
        };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={ email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={ password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

export default Login;

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
