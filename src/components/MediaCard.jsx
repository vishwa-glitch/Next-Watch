import React from 'react';

function MediaCard({ item }) {
  return (
    <div className="media-card">
      <div className="media-img" style={{ backgroundImage: `url('${item.image}')` }}>
        <span className={`media-type ${item.type}`}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      </div>
      
      <div className="media-content">
        <h4 className="media-title">{item.title}</h4>
        <div className="media-info">
          <span>{item.year}</span>
          <span>|</span>
          <span>{item.duration}</span>
        </div>
        <p className="media-description">{item.description}</p>
        
        <button className="watch-btn">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default MediaCard;