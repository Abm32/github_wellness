// src/components/Recommendations.js
import React from 'react';

const Recommendations = ({ recommendations }) => {
  return (
    <div>
      <h3>Health Recommendations</h3>
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <li key={index}>
              {rec.message} {rec.commitTime && `(Commit time: ${new Date(rec.commitTime).toLocaleTimeString()})`}
            </li>
          ))
        ) : (
          <li>No recommendations yet. Analyze your commits!</li>
        )}
      </ul>
    </div>
  );
};

export default Recommendations;
