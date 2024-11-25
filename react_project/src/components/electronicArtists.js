import React, { useState, useEffect } from "react";

const ArtistSearch = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 20; 

  const fetchArtists = async (offset = 0) => {
    setLoading(true);
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = `https://api.spotify.com/v1/search?q=genre:edm&type=artist&limit=${itemsPerPage}&offset=${offset}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching artists: ${response.statusText}`);
      }

      const data = await response.json();
      const artists = data.artists.items;

      console.log(data.artists);

      setArtists(artists); 
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchArtists(nextPage * itemsPerPage); 
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchArtists(prevPage * itemsPerPage);
    }
  };

  useEffect(() => {
    fetchArtists(currentPage * itemsPerPage);
  }, [currentPage]);

  return (
    <div>
      <h1>Search Artists</h1>
      {loading && <p>Loading...</p>}
      <div>
        {artists.length > 0 ? (
          <>
            <ul>
              {artists.map((artist) => (
                <li key={artist.id}>
                  <h3>{artist.name}</h3>
                  <p>{artist.followers.total} followers</p>
                  <img src={artist.images[0]?.url} alt={artist.name} width="100" />
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0 || loading}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
              <button onClick={handleNextPage} disabled={loading}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No artists found. Please select a genre.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistSearch;
