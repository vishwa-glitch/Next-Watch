import React from 'react';
import MediaCard from './MediaCard';

function ResultsSection({ id, results, showResults }) {
  if (!showResults) return null;
  
  // Group results into rows of 4 for better organization
  const groupResultsIntoRows = (items, itemsPerRow = 4) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const resultRows = groupResultsIntoRows(results);
  
  return (
    <section className={`results-section ${showResults ? 'show' : ''}`} id={id}>
      <div className="results-header">
        <h3>Your Personalized Recommendations</h3>
        <p className="results-count">{results.length} recommendations found</p>
      </div>
      
      {results.length === 0 ? (
        <div className="no-results">
          <p>No matches found. Try adjusting your preferences.</p>
        </div>
      ) : (
        <div className="results-container">
          {resultRows.map((row, rowIndex) => (
            <div key={rowIndex} className="results-row">
              <div className="results-grid">
                {row.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ResultsSection;