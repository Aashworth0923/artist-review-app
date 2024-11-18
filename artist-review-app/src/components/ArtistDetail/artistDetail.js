import React from 'react';
import './artistDetail.css';

const ArtistDetail = ({ artist }) => {
    const { images, name, followers, genres, popularity, external_urls } = artist;

    
    const imageUrl = images && images.length > 0 
        ? images[0].url 
        : 'https://via.placeholder.com/300';

    return (
        <div className="artist-detail">
            <div className="artist-detail-image">
                <img src={imageUrl} alt={name} />
            </div>
            
            <div className="artist-detail-content">
                <h2 className="artist-detail-name">{name}</h2>
                
                <div className="artist-detail-stats">
                    <div className="stat-item">
                        <span className="stat-label">Followers</span>
                        <span className="stat-value">
                            {followers?.total?.toLocaleString() || 0}
                        </span>
                    </div>
                    
                    <div className="stat-item">
                        <span className="stat-label">Popularity</span>
                        <span className="stat-value">{popularity}%</span>
                    </div>
                </div>

                {genres && genres.length > 0 && (
                    <div className="artist-detail-genres">
                        <h3>Genres</h3>
                        <div className="genres-list">
                            {genres.map(genre => (
                                <span key={genre} className="genre-tag">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {external_urls?.spotify && (
                    <a 
                        href={external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotify-link"
                    >
                        View on Spotify
                    </a>
                )}
            </div>
        </div>
    );
};

export default ArtistDetail;