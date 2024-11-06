import React, { useState } from 'react';
import Modal from '../Modal/modal';
import { useReviews } from '../../context/reviewContext';
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './artistCard.css';

function ArtistCard({ artist, onGenreClick }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const { addReview } = useReviews();
  const navigate = useNavigate();

  const handleSubmitReview = () => {
    const review = {
      id: Date.now(),
      artistName: artist.name,
      artistId: artist.id,
      followers: artist.followers?.total || 0,
      genres: artist.genres?.join(', ') || '',
      rating: rating,
      dateReviewed: new Date().toISOString()
    };

    addReview(review);
    setShow(false);
    navigate('/profile');
  };

  return (
    <div className="outer-box">
      {/* Artist Image */}
      <div className='artist-img'>
        {artist.images && artist.images[0] ? (
          <img 
            src={artist.images[0].url} 
            alt={artist.name}
            className='artist-img'
          />
        ) : (
          <div className='lostContent'>
            No Image Available
          </div>
        )}
      </div>

      {/* Artist Info */}
      <div>
        <h3 className='artist-header'>
          {artist.name}
        </h3>
        <p className='artist-info'>
          Followers: {artist.followers?.total?.toLocaleString() || 0}
        </p>

        {/* Genre listings */}
        {artist.genres && artist.genres.length > 0 && (
          <div className='artist-genre-box'>
            {artist.genres.slice(0, 3).map(genre => (
                <button 
                    key={genre}
                    className='artist-genre'
                    onClick={() => onGenreClick(genre)}  // Use the prop here
                    >
                    {genre}
                </button>
            ))}
          </div>
        )}

        {/* Popularity % */}
        <div className='artist-pop'>
          <p>Popularity: {artist.popularity}%</p>
        </div>

        {/* Review Button */}
        <div className='review-btn'>
          <button onClick={() => setShow(true)}>
            Leave Review
          </button>
        </div>

        {/* Modal */}
        <Modal show={show} handleClose={() => setShow(false)} artist={artist}>
            <div className="modal-content">
                <div className='modal-header'>
                <h2>Review for {artist.name}</h2>
                </div>
                
                <StarRating 
                rating={rating} 
                onRatingChange={(newRating) => setRating(newRating)} 
                />

                <div className='modal-footer'>
                <button className='button-close' onClick={() => setShow(false)}>
                    Close
                </button>
                <button 
                    className='button-submit' 
                    onClick={handleSubmitReview} 
                    disabled={!rating}
                >
                    <span>Save</span>
                </button>
                </div>
            </div>
            </Modal>
      </div>
    </div>
  );
}

export default ArtistCard;