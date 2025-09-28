import React from 'react';
import { motion } from 'framer-motion';

const platforms = [
  { id: 'netflix', label: 'Netflix' },
  { id: 'amazon', label: 'Prime Video' },
  { id: 'disney', label: 'Disney+' },
  { id: 'hbo', label: 'HBO Max' },
  { id: 'hulu', label: 'Hulu' },
  { id: 'apple', label: 'Apple TV+' },
  { id: 'crunchyroll', label: 'Crunchyroll' }
];

const PlatformSelector = ({ selectedPlatforms, setSelectedPlatforms }) => {
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
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            className={`platform-btn ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
            onClick={() => togglePlatform(platform.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {platform.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;