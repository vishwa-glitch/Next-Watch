import React, { useState } from 'react';
import GenreSection from './GenreSection';
import PlatformSelection from './PlatformSelection';
import ContentTypeSelection from './ContentTypeSelection';
import RangeSlider from './RangeSlider';

function SearchSection({ onFindClick }) {
  const [findButtonText, setFindButtonText] = useState('Find My Next Watch');
  
  const handleFindClick = () => {
    setFindButtonText('Finding...');
    onFindClick();
    setTimeout(() => {
      setFindButtonText('Find My Next Watch');
    }, 1500);
  };

  return (
    <section className="search-section">
      <h3>Your Preferences</h3>
      <GenreSection />
      <PlatformSelection />
      <ContentTypeSelection />
      
      <RangeSlider 
        id="year-slider"
        title="Release Year"
        min={1970}
        max={2025}
        defaultValue={2000}
        valueFormat={(value) => `${value} - 2025`}
      />
      
      <RangeSlider 
        id="duration-slider"
        title="Duration"
        min={0}
        max={4}
        defaultValue={0}
        valueFormat={(value) => {
          const labels = ['Any', 'Short (<90 min)', 'Medium (90-120 min)', 'Long (120+ min)', 'Series'];
          return labels[value];
        }}
      />
      
      <button className="find-btn" onClick={handleFindClick}>
        {findButtonText}
      </button>
    </section>
  );
}

export default SearchSection; 