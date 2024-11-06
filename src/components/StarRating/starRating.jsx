import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="star-rating">
      <h3>Rate this Artist</h3>
      <div className="stars">
        {stars.map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(star)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleStarClick(star);
              }
            }}
            role="button"
            tabIndex={0}
          >
            ★
          </span>
        ))}
      </div>
      <div className="rating-text">
        {rating ? `Your rating: ${rating} stars` : 'Click to rate'}
      </div>
    </div>
  );
};

export default StarRating;