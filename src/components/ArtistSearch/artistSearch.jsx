import React, { useState } from 'react';
import spotifyService from '../../services/spotifyApi';
import ArtistCard from '../ArtistCard/artistCard';
import './artistSearch.css';

function ArtistSearch() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [genreDefinition, setGenreDefinition] = useState('');
  const [loadingDefinition, setLoadingDefinition] = useState(false);

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
      console.log('API Response:', results);
      setArtists(results);
      if (results.length === 0) {
        setError('No artists found. Try another search term.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search artists. Please check your API credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreDefinition = async (genre) => {
    setLoadingDefinition(true);
    setGenreDefinition('');
    
    try {
        console.log('Requesting definition for:', genre);
        
        // Get the backend URL from where your frontend is running
        const backendUrl = 'http://localhost:3001';
        
        const response = await fetch(`${backendUrl}/api/genre-definition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ genre })
        });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.details || 'Failed to get definition');
          }

          const data = await response.json();
          console.log('Received definition:', data); // Debug log
          
          // Handle the Claude API response structure
          if (data.content && data.content[0] && data.content[0].text) {
              setGenreDefinition(`${genre}: ${data.content[0].text}`);
          } else {
              throw new Error('Unexpected response format');
          }
      } catch (error) {
          console.error('Error getting genre definition:', error);
          setGenreDefinition(`Unable to load definition for ${genre}. ${error.message}`);
      } finally {
          setLoadingDefinition(false);
      }
  };

  return (
    <div className="search-container">
      {/* Search Form */}
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

        {/* Status Messages */}
        <div className="status-messages">
          {loading && (
            <div className="status-loading">
              Loading... Calling Spotify API
            </div>
          )}
          {error && (
            <div className="status-error">
              {error}
            </div>
          )}
          {searchPerformed && !loading && !error && artists.length > 0 && (
            <div className="status-success">
              Found {artists.length} artists
            </div>
          )}
        </div>
      </div>

      {/* Genre Definition Section */}
      {(loadingDefinition || genreDefinition) && (
        <div className="genre-definition-container">
          {loadingDefinition ? (
            <div className="definition-loading">
              Loading genre definition...
            </div>
          ) : (
            <div className="definition-content">
              <h3>Genre Definition</h3>
              <p>{genreDefinition}</p>
            </div>
          )}
        </div>
      )}

      {/* Artists Grid */}
      {artists.length > 0 && (
        <div className="artists-grid">
          {artists.map(artist => (
            <ArtistCard 
              key={artist.id} 
              artist={artist} 
              onGenreClick={handleGenreDefinition}  // Pass the handler as a prop
            />
          ))}
        </div>
      )}

      {/* Debug Information */}
      <div className="debug-info">
        <h4>Debug Information:</h4>
        <pre>
          API Status: {loading ? 'Loading' : error ? 'Error' : artists.length > 0 ? 'Success' : 'Ready'}
          {error && `\nError: ${error}`}
          {artists.length > 0 && `\nArtists found: ${artists.length}`}
        </pre>
      </div>
    </div>
  );
}

export default ArtistSearch;