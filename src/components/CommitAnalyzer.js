// src/components/CommitAnalyzer.js
import React, { useState, useEffect } from 'react';
import { fetchCommits } from '../services/GitHubService';
import { getSleepSchedule } from '../services/FirebaseService';

const CommitAnalyzer = ({ userId }) => {
  const [commits, setCommits] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyzeCommits = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
        const commits = await fetchCommits('management_app'); // Replace 'your-repo-name' with the actual repo name
        setCommits(commits);

        const sleepSchedule = await getSleepSchedule(userId);
        if (sleepSchedule) {
          const analysisResults = analyzeCommitTimes(commits, sleepSchedule);
          setAnalysis(analysisResults);
        }
      } catch (error) {
        console.error('Error analyzing commits: ', error);
        setError('Failed to fetch commits. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    analyzeCommits();
  }, [userId]);

  const analyzeCommitTimes = (commits, sleepSchedule) => {
    const sleepStart = new Date(`1970-01-01T${sleepSchedule.sleepStart}:00`);
    const sleepEnd = new Date(`1970-01-01T${sleepSchedule.sleepEnd}:00`);
    const analysis = [];

    commits.forEach(commit => {
      const commitTime = new Date(commit.commit.author.date);
      const commitHours = commitTime.getHours();
      
      if (commitTime >= sleepStart && commitTime <= sleepEnd) {
        analysis.push({ 
          message: 'Commit during sleep hours detected!', 
          commitTime 
        });
      } else if (commitHours >= 22 || commitHours < 6) {
        analysis.push({ 
          message: 'Late-night commit detected! Consider reducing late-night work.', 
          commitTime 
        });
      }
    });

    analysis.push({ message: 'Remember to stay hydrated!' });
    return analysis;
  };

  return (
    <div>
      <h3>Commit Analysis</h3>
      {loading && <p>Loading commits...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {analysis.length > 0 ? (
          analysis.map((item, index) => (
            <li key={index}>
              {item.message} {item.commitTime && `(Commit time: ${new Date(item.commitTime).toLocaleTimeString()})`}
            </li>
          ))
        ) : (
          <li>No analysis yet. Analyze your commits!</li>
        )}
      </ul>
    </div>
  );
};

export default CommitAnalyzer;
