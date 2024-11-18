import React, { useState } from 'react';
import spotifyService from '../../services/spotifyApi';
import ArtistCard from '../ArtistCard/artistCard';
import ArtistDetail from '../ArtistDetail/artistDetail';
import './artistSearch.css';

function ArtistSearch() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

    const selectArtistById = (id) => {
    const found = artists.find((artist) => artist.id === id);
    setSelectedArtist(found);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter an artist name');
      return;
    }

    setLoading(true);
    setError('');
    setSearchPerformed(true);

    try {
      const results = await spotifyService.searchArtists(query);
      setArtists(results); 
      if (results.length === 0) {
        setError('No artists found. Try another search term.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search artists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-form-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter artist name..."
            className="search-input"
          />
          <button 
            type="submit"
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      <div className="main-content">
        {/* Artists Grid */}
        <div className={`artists-list ${selectedArtist ? 'with-detail' : ''}`}>
          {artists.map(artist => (
            <ArtistCard 
              key={artist.id} 
              artist={artist}
              onArtistSelect={() => selectArtistById(artist.id)}
            />
          ))}
        </div>

        {/* Artist Detail */}
        {selectedArtist && (
          <div className="artist-detail-wrapper">
            <ArtistDetail artist={selectedArtist} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtistSearch;