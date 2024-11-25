import React, { useState, useEffect } from "react";

const ElectronicArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      const token = localStorage.getItem("spotifyAccessToken");

      if (!token) {
        console.error("No token found. Please authenticate first.");
        return;
      }

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=genre:edm&type=artist&limit=10`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching artists: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data); 
        const artists = data.artists.items;

        setArtists(
          artists.map((artist) => ({
            name: artist.name,
            url: artist.external_urls.spotify,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    loadArtists();
  }, []);

  return (
    <div>
      <h1>Artistas de Música Electrónica</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {artists.map((artist, index) => (
            <li key={index}>
              <a href={artist.url} target="_blank" rel="noopener noreferrer">
                {artist.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectronicArtists;
