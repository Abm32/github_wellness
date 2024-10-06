// src/App.js
import React, { useState } from 'react';
import SleepSchedule from './components/SleepSchedule';
import CommitAnalyzer from './components/CommitAnalyzer';
import './styles/App.css';

const App = () => {
  const [userId, setUserId] = useState('unique-user-id'); // Firebase Auth user ID

  return (
    <div className="app">
      <header className="app-header">
        <h1>Developer Wellness App</h1>
      </header>
      <main>
        <SleepSchedule userId={userId} />
        <CommitAnalyzer userId={userId} />
      </main>
    </div>
  );
};

export default App;
