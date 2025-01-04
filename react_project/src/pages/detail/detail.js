import { useParams } from "react-router-dom";
import Nav from "../../components/shared/nav/nav";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/list_components/albumCard";

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
      console.log(albums);
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
      {artist && <img src={artist.images[1].url} />}
      {artist && <h1>{artist.name}</h1>}
      <div>
        <div>
          <h2>Artist Album</h2> 
          <ul>
            {albums.map((album) => (
              <AlbumCard key={album.id} id={album.id} name={album.name} image={album.images[2].url} releaseDate={album.release_date}/>
            ))}
          </ul>
        </div>
        <div>
          <h2>Artist Top Tracks</h2> 
        </div>
        
      </div>
      
    </div>
  );
};

export default Detail;
