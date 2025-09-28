import React from 'react';

const StarfieldBackground = () => {
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3;
      const animationDuration = 5 + Math.random() * 10;
      const delay = Math.random() * 5;
      
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="starfield-container">
      <div className="stars-layer stars-layer-1">
        {generateStars(50)}
      </div>
      <div className="stars-layer stars-layer-2">
        {generateStars(30)}
      </div>
      <div className="stars-layer stars-layer-3">
        {generateStars(20)}
      </div>
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
    </div>
  );
};

export default StarfieldBackground;
