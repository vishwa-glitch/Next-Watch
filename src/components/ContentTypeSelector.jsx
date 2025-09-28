import React from 'react';
import { motion } from 'framer-motion';

const contentTypes = [
  { id: 'all', label: 'All Types' },
  { id: 'movie', label: 'Movies' },
  { id: 'series', label: 'TV Series' },
  { id: 'anime', label: 'Anime' }
];

const ContentTypeSelector = ({ selectedType, setSelectedType }) => {
  return (
    <div className="slider-container">
      <h4>Content Type</h4>
      <div className="content-type">
        <div className="platforms">
          {contentTypes.map((type) => (
            <motion.button
              key={type.id}
              className={`platform-btn ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTypeSelector;