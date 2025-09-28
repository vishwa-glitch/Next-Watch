import React from 'react';
import { motion } from 'framer-motion';
import GenreSelector from './GenreSelector';
import PlatformSelector from './PlatformSelector';
import ContentTypeSelector from './ContentTypeSelector';
import RangeSlider from './RangeSlider';

const PreferencesSection = ({ filters, setFilters, handleSearch, isLoading }) => {
  return (
    <motion.section 
      className="search-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Your Preferences
      </motion.h3>

      <GenreSelector 
        selectedGenres={filters.genres}
        setSelectedGenres={(genres) => setFilters({...filters, genres})}
      />
      
      <PlatformSelector 
        selectedPlatforms={filters.platforms}
        setSelectedPlatforms={(platforms) => setFilters({...filters, platforms})}
      />
      
      <ContentTypeSelector 
        selectedType={filters.contentType}
        setSelectedType={(contentType) => setFilters({...filters, contentType})}
      />
      
      <RangeSlider 
        title="Release Year"
        min={1970}
        max={2025}
        defaultValue={2000}
        onChange={(value) => setFilters({...filters, yearRange: [value, 2025]})}
        formatLabel={(value) => `${value} - 2025`}
      />
      
      <RangeSlider 
        title="Duration"
        min={0}
        max={4}
        defaultValue={0}
        onChange={(value) => setFilters({...filters, duration: value})}
        formatLabel={(value) => {
          const labels = ['Any', 'Short (<90 min)', 'Medium (90-120 min)', 'Long (120+ min)', 'Series'];
          return labels[value];
        }}
        steps={4}
      />
      
      <motion.button 
        className="find-btn"
        onClick={handleSearch}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Finding...
          </>
        ) : 'Find My Next Watch'}
      </motion.button>
    </motion.section>
  );
};

export default PreferencesSection;