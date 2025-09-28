import React, { useState } from 'react';

function PlatformSelection() {
  const platforms = [
    { id: 'netflix', name: 'Netflix' },
    { id: 'amazon', name: 'Prime Video' },
    { id: 'disney', name: 'Disney+' },
    { id: 'hbo', name: 'HBO Max' },
    { id: 'hulu', name: 'Hulu' },
    { id: 'apple', name: 'Apple TV+' },
    { id: 'crunchyroll', name: 'Crunchyroll' }
  ];
  
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  
  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  return (
    <div className="platform-selection">
      <h4>Available Streaming Platforms</h4>
      <div className="platforms">
        {platforms.map(platform => (
          <button 
            key={platform.id}
            className={`platform-btn ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
            onClick={() => togglePlatform(platform.id)}
          >
            {platform.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlatformSelection; 