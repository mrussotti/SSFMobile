// SleepTracker.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SleepTracker = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState(0);

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
    if (sleepDuration < 8) {
      return "You're not getting enough sleep. It's recommended to get 8 hours of sleep per day.";
    } else if (sleepDuration > 8) {
      return "You're getting more than the recommended sleep. It's okay as long as you're feeling rested.";
    } else {
      return "You're getting the perfect amount of sleep. Keep it up!";
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
