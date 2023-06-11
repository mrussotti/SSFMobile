// CalorieTracker.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CalorieTracker = () => {
  const [breakfastCalories, setBreakfastCalories] = useState(0);
  const [lunchCalories, setLunchCalories] = useState(0);
  const [dinnerCalories, setDinnerCalories] = useState(0);
  const [snacksCalories, setSnacksCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

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
    </View>
  );
};

export default CalorieTracker;
