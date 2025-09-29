import React from 'react';

function ContentTypeSelection({ selectedContentType = 'all', onContentTypeChange }) {
  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'movie', name: 'Movies' },
    { id: 'series', name: 'TV Series' },
    { id: 'anime', name: 'Anime' }
  ];
  
  return (
    <div className="slider-container">
      <h4>Content Type</h4>
      <div className="content-type">
        <div className="platforms">
          {types.map(type => (
            <button 
              key={type.id}
              className={`platform-btn ${selectedContentType === type.id ? 'selected' : ''}`}
              onClick={() => onContentTypeChange(type.id)}
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