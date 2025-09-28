import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import StarfieldBackground from './components/StarfieldBackground';
import apiService from './services/api';
import { sampleResults } from './data/sampleData';

function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFindClick = async (preferences = {}) => {
    setLoading(true);
    setError(null);
    setShowResults(false);
    
    try {
      // Try to get recommendations from the API
      // If API is not available, fall back to sample data
      const data = await apiService.getRecommendations(preferences)
        .catch(() => {
          // Fallback to sample data if API fails
          return { results: sampleResults };
        });
      
      setResults(data.results || data);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      // Use sample data as fallback
      setResults(sampleResults);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <StarfieldBackground />
      <div className="animated-bg"></div>
      <div className="content-container">
        <Header />
        <Hero />
        <SearchSection onFindClick={handleFindClick} />
        <ResultsSection 
          id="results" 
          results={results} 
          showResults={showResults} 
        />
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;

