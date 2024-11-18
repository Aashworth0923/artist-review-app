import React, { useState } from 'react';
import './artistCard.css';

function ArtistCard({ artist, onArtistSelect }) {
  const handleClick = (e) => {
    if (
      e.target.className.includes('artist-genre') || 
      e.target.className.includes('review-btn')
    ) {
      return;
    }
    onArtistSelect(artist.id);
  };

  return (
    <div className="outer-box" onClick={handleClick}>
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
      </div>
    </div>
  );
}

export default ArtistCard;