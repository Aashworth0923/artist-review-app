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

    // takes the id pased when a user clicks on a card and does a find for that artist
  const selectArtistById = (id) => {
    if (selectedArtist && selectedArtist.id === id){
      setSelectedArtist(null);
      return;
    }
    const found = artists.find((artist) => artist.id === id);
    setSelectedArtist(found);
  };

  const handleSearch = async (e) => {
    // e.preventDefault prevents form from refreshing when submitted
    e.preventDefault();
    setLoading(true);

    try {
      const results = await spotifyService.searchArtists(query);
      setArtists(results); 
    } catch (error) {
      console.error('Search error:', error);
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