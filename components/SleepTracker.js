// SleepTracker.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SleepTracker = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState(0);
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  useEffect(() => {
    const userId = auth.currentUser.uid;
    firebase.firestore().collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          setAge(doc.data().age);
          setActivityLevel(doc.data().activityLevel);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const calculateSleepDuration = () => {
    const sleep = new Date(`1970-01-01T${sleepTime}Z`);
    const wake = new Date(`1970-01-01T${wakeTime}Z`);
    let duration = (wake - sleep) / (1000 * 60 * 60);
    if (duration < 0) {
      duration += 24;
    }
    setSleepDuration(duration.toFixed(2));
  };

  const getSleepRecommendation = () => {
    if (age < 18) {
      return "As a teenager, you should aim for 8 to 10 hours of sleep per night.";
    } else if (age >= 18 && age <= 64) {
      if (activityLevel === 'high') {
        return "As an active adult, you should aim for 7 to 9 hours of sleep per night, but you might need more due to your high activity level.";
      } else {
        return "As an adult, you should aim for 7 to 9 hours of sleep per night.";
      }
    } else {
      return "As an older adult, you should aim for 7 to 8 hours of sleep per night.";
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter sleep and wake time (24-hour format):</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Sleep time (e.g., 22:00)"
        onChangeText={setSleepTime}
        value={sleepTime}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Wake time (e.g., 07:00)"
        onChangeText={setWakeTime}
        value={wakeTime}
      />
      <Button
        title="Calculate sleep duration"
        onPress={calculateSleepDuration}
      />
      <Text>Total sleep duration: {sleepDuration} hours</Text>
      <Text>{getSleepRecommendation()}</Text>
    </View>
  );
};

export default SleepTracker;
