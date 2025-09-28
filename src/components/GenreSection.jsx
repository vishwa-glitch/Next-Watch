import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, faLaugh, faTheaterMasks, faGhost, 
  faExclamationCircle, faRobot, faHatWizard, 
  faHeart, faCompass, faSearch, faChild, faFilm 
} from '@fortawesome/free-solid-svg-icons';

function GenreSection() {
  const genres = [
    { id: 'action', name: 'Action', icon: faFire },
    { id: 'comedy', name: 'Comedy', icon: faLaugh },
    { id: 'drama', name: 'Drama', icon: faTheaterMasks },
    { id: 'horror', name: 'Horror', icon: faGhost },
    { id: 'thriller', name: 'Thriller', icon: faExclamationCircle },
    { id: 'sci-fi', name: 'Sci-Fi', icon: faRobot },
    { id: 'fantasy', name: 'Fantasy', icon: faHatWizard },
    { id: 'romance', name: 'Romance', icon: faHeart },
    { id: 'adventure', name: 'Adventure', icon: faCompass },
    { id: 'mystery', name: 'Mystery', icon: faSearch },
    { id: 'animation', name: 'Animation', icon: faChild },
    { id: 'documentary', name: 'Documentary', icon: faFilm }
  ];
  
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };
  
  return (
    <div className="genre-section">
      <h4>Select Genres (Multiple Choice)</h4>
      <div className="genre-grid">
        {genres.map(genre => (
          <div 
            key={genre.id}
            className={`genre-item ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre.id)}
          >
            <FontAwesomeIcon icon={genre.icon} />
            <span>{genre.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreSection; 