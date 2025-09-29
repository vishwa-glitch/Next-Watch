import React, { useState } from 'react';
import GenreSection from './GenreSection';
import PlatformSelection from './PlatformSelection';
import ContentTypeSelection from './ContentTypeSelection';
import RangeSlider from './RangeSlider';

function SearchSection({ onFindClick }) {
  const [findButtonText, setFindButtonText] = useState('Find My Next Watch');
  
  // Form state management
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [releaseYear, setReleaseYear] = useState({ min: 2000, max: 2025 });
  const [duration, setDuration] = useState({ min: 60, max: 180 });
  
  const handleFindClick = () => {
    console.log('🎯 SearchSection: Collecting form data...');
    
    // Map content type to backend format
    let contentTypes = [];
    if (selectedContentType === 'all') {
      contentTypes = ['movies', 'tv-series', 'anime'];
    } else if (selectedContentType === 'movie') {
      contentTypes = ['movies'];
    } else if (selectedContentType === 'series') {
      contentTypes = ['tv-series'];
    } else if (selectedContentType === 'anime') {
      contentTypes = ['anime'];
    }
    
    // Map platform IDs to backend format
    const platformMapping = {
      'netflix': 'netflix',
      'amazon': 'prime-video',
      'disney': 'disney+',
      'hbo': 'hbo-max',
      'hulu': 'hulu',
      'apple': 'apple-tv+',
      'crunchyroll': 'crunchyroll'
    };
    
    const mappedPlatforms = selectedPlatforms.map(p => platformMapping[p] || p);
    
    const preferences = {
      genres: selectedGenres,
      platforms: mappedPlatforms,
      contentTypes: contentTypes,
      releaseYear: releaseYear,
      duration: duration
    };
    
    console.log('🎯 SearchSection: Sending preferences to App:', preferences);
    
    setFindButtonText('Finding...');
    onFindClick(preferences);
    setTimeout(() => {
      setFindButtonText('Find My Next Watch');
    }, 1500);
  };

  return (
    <section className="search-section">
      <h3>Your Preferences</h3>
      <GenreSection 
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
      />
      <PlatformSelection 
        selectedPlatforms={selectedPlatforms}
        onPlatformChange={setSelectedPlatforms}
      />
      <ContentTypeSelection 
        selectedContentType={selectedContentType}
        onContentTypeChange={setSelectedContentType}
      />
      
      <RangeSlider 
        id="year-slider"
        title="Release Year"
        min={1970}
        max={2025}
        defaultValue={2000}
        valueFormat={(value) => `${value} - 2025`}
        onChange={(value) => setReleaseYear({ min: value, max: 2025 })}
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
        onChange={(value) => {
          const durationMappings = [
            { min: 0, max: 300 }, // Any
            { min: 0, max: 90 },  // Short
            { min: 90, max: 120 }, // Medium
            { min: 120, max: 300 }, // Long
            { min: 0, max: 300 }  // Series (any duration)
          ];
          setDuration(durationMappings[value]);
        }}
      />
      
      <button className="find-btn" onClick={handleFindClick}>
        {findButtonText}
      </button>
    </section>
  );
}

export default SearchSection; 