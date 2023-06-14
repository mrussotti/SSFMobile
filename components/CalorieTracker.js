// CalorieTracker.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const CalorieTracker = () => {
  const [breakfastCalories, setBreakfastCalories] = useState(0);
  const [lunchCalories, setLunchCalories] = useState(0);
  const [dinnerCalories, setDinnerCalories] = useState(0);
  const [snacksCalories, setSnacksCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

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

  const calculateTotalCalories = () => {
    const total = Number(breakfastCalories) + Number(lunchCalories) + Number(dinnerCalories) + Number(snacksCalories);
    setTotalCalories(total);
  };

  const getCalorieRecommendation = () => {
    if (totalCalories < 2000) {
      return "You're not meeting your daily caloric intake. Try to eat more balanced meals.";
    } else if (totalCalories > 2000) {
      return "You're exceeding your daily caloric intake. Consider healthier food choices.";
    } else {
      return "You're meeting your daily caloric intake perfectly. Keep it up!";
    }
  };

  if (!weight || !height || !age) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Please update your health data in the settings.</Text>
      </View>
    );
  }

  const calculateBMR = () => {
    return 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter your calories for each meal:</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Breakfast Calories"
        onChangeText={setBreakfastCalories}
        value={String(breakfastCalories)}
        keyboardType="numeric"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Lunch Calories"
        onChangeText={setLunchCalories}
        value={String(lunchCalories)}
        keyboardType="numeric"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Dinner Calories"
        onChangeText={setDinnerCalories}
        value={String(dinnerCalories)}
        keyboardType="numeric"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Snacks Calories"
        onChangeText={setSnacksCalories}
        value={String(snacksCalories)}
        keyboardType="numeric"
      />
      <Button
        title="Calculate total calories"
        onPress={calculateTotalCalories}
      />
      <Text>Total calories for the day: {totalCalories}</Text>
      <Text>{getCalorieRecommendation()}</Text>
      <Text>Your BMR is: {calculateBMR()}</Text>
    </View>
  );
};

export default CalorieTracker;
