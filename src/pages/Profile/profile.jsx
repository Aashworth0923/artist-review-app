import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviews } from '../../context/reviewContext';
import './profile.css';

function Profile() {
  const { reviews } = useReviews();
  const navigate = useNavigate();

  // Date formatting to show when the review occured
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Search
        </button>
        <h1>Your Music Reviews</h1>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Reviews</h3>
          <p>{reviews.length}</p>
        </div>
        <div className="stat-box">
          <h3>Average Rating</h3>
          <p>{averageRating} / 5</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>You haven't written any reviews yet.</p>
          <button onClick={() => navigate('/')}>Start Reviewing</button>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h2>{review.artistName}</h2>
                <div className="rating-display">
                  {/* array(5) creates and empty array of 5 and ... spreads this into 5 undefined slots*/}
                  {[...Array(5)].map((_, index) => (
                    // span renders a new star for each index and based on rating sets its color if rating =3 them first 3 will be color 1
                    <span 
                      key={index} 
                      style={{ 
                        color: index < review.rating ? '#ffd700' : '#ddd'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
              
              <div className="review-details">
                <p className="followers">
                  Followers: {review.followers.toLocaleString()}
                </p>
                <p className="genres">
                  Genres: {review.genres}
                </p>
                <p className="date">
                  Reviewed on: {formatDate(review.dateReviewed)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;