import React from 'react';
import { motion } from 'framer-motion';

const genres = [
  { id: 'action', icon: 'fa-fire', label: 'Action' },
  { id: 'comedy', icon: 'fa-laugh', label: 'Comedy' },
  { id: 'drama', icon: 'fa-theater-masks', label: 'Drama' },
  { id: 'horror', icon: 'fa-ghost', label: 'Horror' },
  { id: 'thriller', icon: 'fa-exclamation-circle', label: 'Thriller' },
  { id: 'sci-fi', icon: 'fa-robot', label: 'Sci-Fi' },
  { id: 'fantasy', icon: 'fa-hat-wizard', label: 'Fantasy' },
  { id: 'romance', icon: 'fa-heart', label: 'Romance' },
  { id: 'adventure', icon: 'fa-compass', label: 'Adventure' },
  { id: 'mystery', icon: 'fa-search', label: 'Mystery' },
  { id: 'animation', icon: 'fa-child', label: 'Animation' },
  { id: 'documentary', icon: 'fa-film', label: 'Documentary' }
];

const GenreSelector = ({ selectedGenres, setSelectedGenres }) => {
  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="genre-section">
      <h4>Select Genres (Multiple Choice)</h4>
      <motion.div 
        className="genre-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {genres.map((genre) => (
          <motion.div
            key={genre.id}
            className={`genre-item ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre.id)}
            variants={item}
            whileHover={{ 
              y: -5, 
              boxShadow: '0 5px 15px rgba(0, 191, 255, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <i className={`fas ${genre.icon}`}></i>
            <span>{genre.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GenreSelector;