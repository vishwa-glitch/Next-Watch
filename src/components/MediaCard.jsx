import React from 'react';

function MediaCard({ item }) {
  const handleImageError = (e) => {
    e.target.src = 'https://picsum.photos/400/600';
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="media-card">
      <div className="media-img-container">
        <img 
          src={item.image} 
          alt={item.title}
          className="media-img"
          onError={handleImageError}
        />
        <div className="media-overlay">
          <span className={`media-type ${item.type}`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          <div className="media-rating">
            <span className="rating-star">★</span>
            <span>{item.rating ? item.rating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div className="media-content">
        <h4 className="media-title" title={item.title}>{item.title}</h4>
        <div className="media-info">
          <span className="media-year">{item.year || 'N/A'}</span>
          <span className="separator">•</span>
          <span className="media-duration">{item.duration}</span>
        </div>
        
        {item.genres && item.genres.length > 0 && (
          <div className="media-genres">
            {item.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        )}
        
        <p className="media-description" title={item.description}>
          {truncateDescription(item.description)}
        </p>
        
        <button className="watch-btn">
          <span className="btn-icon">▶</span>
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default MediaCard;