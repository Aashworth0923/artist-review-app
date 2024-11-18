const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

class SpotifyService {
    constructor() {
        this.accessToken = null;
        this.tokenExpirationTime = null;
    }

    async getAccessToken() {
        // Check if we have a valid token
        if (this.accessToken && this.tokenExpirationTime > Date.now()) {
            return this.accessToken;
        }

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
                },
                body: 'grant_type=client_credentials'
            });

            if (!response.ok) {
                throw new Error('Failed to get access token');
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            // Set expiration time (token expires in 3600 seconds)
            this.tokenExpirationTime = Date.now() + (data.expires_in * 1000);
            return this.accessToken;

        } catch (error) {
            console.error('Error getting Spotify access token:', error);
            throw error;
        }
    }

    async searchArtists(query) {
        try {
            const token = await this.getAccessToken();
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to search artists');
            }

            const data = await response.json();
            return data.artists.items;

        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }
}

const spotifyService = new SpotifyService();
export default spotifyService;