import { useParams } from "react-router-dom";
import Nav from "../view/nav";
import { useEffect, useState } from "react";

const Detail = () => {
  const id = useParams();
  const [albums, SetAlbums] = useState([]);
  const [artist, SetArtist] = useState(null);
    // Función para obtener detalles del artista
    const fetchArtistDetails = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (!token) {
        console.error("No token found. Please authenticate first.");
        return;
      }
  
      try {
        const url = `https://api.spotify.com/v1/artists/${id.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching artist details: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log(data);
        SetArtist(data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

  const fetchAlbums = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/artists/' + id.id + '/albums?include_groups=album';
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
      const albums = data.items;
      SetAlbums(albums); 

    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
      fetchArtistDetails();
      fetchAlbums();
  }, [id.id]);

  return (
    <div>
      <Nav />
      {artist && <h1>{artist.name}</h1>} 
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.name} - {album.release_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
