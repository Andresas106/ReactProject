import { useParams } from "react-router-dom";
import Nav from "../../components/shared/nav/nav";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/list_components/albumCard";
import TrackCard from "../../components/list_components/trackCard";
import "../detail/detail.css";

const Detail = () => {
  const id = useParams();
  const [albums, SetAlbums] = useState([]);
  const [artist, SetArtist] = useState(null);
  const [tracks, SetTracks] = useState([]);
  const [relatedArtists, SetRelatedArtists] = useState([]);
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
        throw new Error(`Error fetching albums artist: ${response.statusText}`);
      }

      const data = await response.json();
      const albums = data.items;
      SetAlbums(albums); 


    } catch (error) {
      console.error("Error fetching albums artist:", error);
    }
  };

  const fetchTopArtists = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/artists/' + id.id + '/top-tracks';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching top tracks artist: ${response.statusText}`);
      }

      const data = await response.json();
      const tracks = data.tracks;
      SetTracks(tracks); 
    } catch (error) {
      console.error("Error fetching top tracks artist:", error);
    }
  };

  useEffect(() => {
      fetchArtistDetails();
      fetchAlbums();
      fetchTopArtists();
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
          <ul>
            {tracks.map((track) => (
              <TrackCard key={track.id} id={track.id} />
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Detail;
