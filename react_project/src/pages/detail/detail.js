// Importing necessary modules and components from React and React Router
import { useParams } from "react-router-dom";
import Nav from "../../components/shared/nav/nav";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/list_components/albumCard";
import TrackCard from "../../components/list_components/trackCard";
import "../detail/detail.css";

// Main functional component
const Detail = () => {
  const id = useParams();  // Retrieves the artist ID from the URL parameters
  const [albums, SetAlbums] = useState([]);  // State to hold artist's albums
  const [artist, SetArtist] = useState(null);  // State to hold artist's details
  const [tracks, SetTracks] = useState([]);  // State to hold artist's top tracks
  const [relatedArtists, SetRelatedArtists] = useState([]);  // State to hold related artists

  // Function to fetch artist details from Spotify API
  const fetchArtistDetails = async () => {
    const token = localStorage.getItem("spotifyAccessToken");  // Retrieve stored token
    if (!token) {
      console.error("No token found. Please authenticate first.");  // Handle missing token
      return;
    }

    try {
      const url = `https://api.spotify.com/v1/artists/${id.id}`;  // API URL for fetching artist details
      const response = await fetch(url, {  // Fetch data from API
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,  // Authorization header with token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching artist details: ${response.statusText}`);  // Error handling
      }

      const data = await response.json();  // Parse JSON response
      SetArtist(data);  // Update state with artist details

    } catch (error) {
      console.error("Error fetching artist details:", error);  // Log any errors
    }
  };

  // Function to fetch artist's albums from Spotify API
  const fetchAlbums = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/artists/' + id.id + '/albums?include_groups=album';  // API URL for fetching albums
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
      SetAlbums(albums);  // Update state with albums

    } catch (error) {
      console.error("Error fetching albums artist:", error);
    }
  };

  // Function to fetch artist's top tracks from Spotify API
  const fetchTopArtists = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/artists/' + id.id + '/top-tracks';  // API URL for fetching top tracks
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
      SetTracks(tracks);  // Update state with top tracks

    } catch (error) {
      console.error("Error fetching top tracks artist:", error);
    }
  };

  // useEffect to run the data fetching functions when the component mounts or when ID changes
  useEffect(() => {
    fetchArtistDetails();  // Fetch artist details
    fetchAlbums();  // Fetch albums
    fetchTopArtists();  // Fetch top tracks
  }, [id.id]);

  return (
    <div>
      <Nav />  {/* Navigation bar */}
      {artist && <img src={artist.images[1].url} />}  {/* Display artist image */}
      {artist && <h1>{artist.name}</h1>}  {/* Display artist name */}
      <div>
        <div className="section">
          <h2>Artist Albums</h2>
          <ul>
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                name={album.name}
                image={album.images[2]?.url}
                releaseDate={album.release_date}
              />
            ))}
          </ul>
        </div>
        <div className="section">
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
