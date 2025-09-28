import React from 'react';
import MediaCard from './MediaCard';

function ResultsSection({ id, results, showResults }) {
  if (!showResults) return null;
  
  return (
    <section className={`results-section ${showResults ? 'show' : ''}`} id={id}>
      <h3>Your Personalized Recommendations</h3>
      
      {results.length === 0 ? (
        <div className="no-results">
          <p>No matches found. Try adjusting your preferences.</p>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ResultsSection;