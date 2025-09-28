import React, { useState } from 'react';

function ContentTypeSelection() {
  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'movie', name: 'Movies' },
    { id: 'series', name: 'TV Series' },
    { id: 'anime', name: 'Anime' }
  ];
  
  const [selectedType, setSelectedType] = useState('all');
  
  return (
    <div className="slider-container">
      <h4>Content Type</h4>
      <div className="content-type">
        <div className="platforms">
          {types.map(type => (
            <button 
              key={type.id}
              className={`platform-btn ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentTypeSelection; 