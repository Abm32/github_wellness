// src/services/FirebaseService.js
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const saveSleepSchedule = async (userId, sleepStart, sleepEnd) => {
  try {
    await addDoc(collection(db, 'sleepSchedules'), {
      userId,
      sleepStart,
      sleepEnd,
      timestamp: new Date()
    });
    console.log('Sleep schedule saved successfully.');
  } catch (error) {
    console.error('Error saving sleep schedule: ', error);
  }
};

export const getSleepSchedule = async (userId) => {
  const q = query(collection(db, 'sleepSchedules'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  let sleepSchedule = null;
  querySnapshot.forEach(doc => {
    sleepSchedule = doc.data();
  });

  return sleepSchedule;
};
