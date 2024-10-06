// src/components/SleepSchedule.js
import React, { useState } from 'react';
import { saveSleepSchedule } from '../services/FirebaseService';

const SleepSchedule = ({ userId }) => {
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');

  const handleSaveSchedule = async () => {
    if (sleepStart && sleepEnd) {
      await saveSleepSchedule(userId, sleepStart, sleepEnd);
      alert('Sleep schedule saved successfully!');
    } else {
      alert('Please enter both sleep start and end times.');
    }
  };

  return (
    <div>
      <h3>Set Your Sleep Schedule</h3>
      <input
        type="time"
        value={sleepStart}
        onChange={(e) => setSleepStart(e.target.value)}
        placeholder="Sleep Start Time"
      />
      <input
        type="time"
        value={sleepEnd}
        onChange={(e) => setSleepEnd(e.target.value)}
        placeholder="Sleep End Time"
      />
      <button onClick={handleSaveSchedule}>Save Sleep Schedule</button>
    </div>
  );
};

export default SleepSchedule;
