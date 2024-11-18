export const selectAllArtists = (artists) => {
    return artists;
};

export const selectedArtistById = (artists, id) => {
    return artists.find((artist) => artist.id === id);
};
