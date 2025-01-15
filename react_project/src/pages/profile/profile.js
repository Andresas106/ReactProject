import PlaylistCard from "../../components/list_components/playlistCard";  // Import PlaylistCard component
import TrackCard from "../../components/list_components/trackCard";      // Import TrackCard component
import Nav from "../../components/shared/nav/nav";                      // Import navigation component
import Flag from "react-world-flags";                                   // Import the react-world-flags library for country flags
import { useEffect, useState } from "react";                            // Import React hooks: useEffect and useState
import "../profile/UserProfile.css";                                   // Import CSS for the profile page
import Footer from "../footer/footer.js"; // footer

const UserProfile = () => {
  // State to store user data, favorite tracks, playlists, and recently played tracks
  const [userData, SetUserData] = useState([]);                      // User profile data
  const [userFavoritesTracks, SetUserFavoritesTracks] = useState([]);  // User's favorite tracks
  const [userPlaylists, SetUserPlaylists] = useState([]);              // User's saved playlists
  const [recentlyTracks, SetRecentlyTracks] = useState([]);            // User's recently played tracks

  // Function to fetch the user's profile data from Spotify API
  const fetchUserData = async () => {
    const token = localStorage.getItem("spotifyAccessToken");         // Retrieve Spotify access token from local storage
    if (!token) {
      console.error("No token found. Please authenticate first.");    // Error message if token is missing
      return;
    }

    try {
      const url = "https://api.spotify.com/v1/me";                     // API endpoint to get user data
      const response = await fetch(url, {                              // Fetch the user data
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,                            // Authorization header with access token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);  // Throw an error if fetching fails
      }

      const data = await response.json();                             // Parse the response to JSON
      SetUserData(data);                                             // Set the user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);              // Log error message
    }
  };

  // Function to fetch the user's top tracks from Spotify API
  const fetchTopTracks = async () => {
    const token = localStorage.getItem("spotifyAccessToken");         // Retrieve Spotify access token from local storage
    if (!token) {
      console.error("No token found. Please authenticate first.");    // Error message if token is missing
      return;
    }

    try {
      const url = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20";  // API endpoint to get top tracks
      const response = await fetch(url, {                              // Fetch the top tracks
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,                            // Authorization header with access token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching top tracks: ${response.statusText}`);  // Throw an error if fetching fails
      }

      const data = await response.json();                             // Parse the response to JSON
      SetUserFavoritesTracks(data.items);                             // Set the top tracks in state
    } catch (error) {
      console.error("Error fetching top tracks:", error);              // Log error message
    }
  };

  // Function to fetch the user's saved playlists from Spotify API
  const fetchSavedPlaylists = async () => {
    const token = localStorage.getItem("spotifyAccessToken");         // Retrieve Spotify access token from local storage
    if (!token) {
      console.error("No token found. Please authenticate first.");    // Error message if token is missing
      return;
    }

    try {
      const url = "https://api.spotify.com/v1/me/playlists";          // API endpoint to get saved playlists
      const response = await fetch(url, {                              // Fetch the playlists
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,                            // Authorization header with access token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching playlists: ${response.statusText}`);  // Throw an error if fetching fails
      }

      const data = await response.json();                             // Parse the response to JSON
      SetUserPlaylists(data.items);                                    // Set the playlists in state
    } catch (error) {
      console.error("Error fetching playlists:", error);               // Log error message
    }
  };

  // Function to fetch the user's recently played tracks from Spotify API
  const fetchRecentlyPlayedTracks = async () => {
    const token = localStorage.getItem("spotifyAccessToken");         // Retrieve Spotify access token from local storage
    if (!token) {
      console.error("No token found. Please authenticate first.");    // Error message if token is missing
      return;
    }

    try {
      const url = "https://api.spotify.com/v1/me/player/recently-played?limit=20";  // API endpoint to get recently played tracks
      const response = await fetch(url, {                              // Fetch the recently played tracks
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,                            // Authorization header with access token
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching recently played tracks: ${response.statusText}`);  // Throw an error if fetching fails
      }

      const data = await response.json();                             // Parse the response to JSON
      SetRecentlyTracks(data.items);                                   // Set the recently played tracks in state
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);  // Log error message
    }
  };

  // Fetch user data, top tracks, saved playlists, and recently played tracks when the component mounts
  useEffect(() => {
    fetchUserData();                      // Fetch user profile data
    fetchTopTracks();                      // Fetch user's top tracks
    fetchSavedPlaylists();                 // Fetch user's saved playlists
    fetchRecentlyPlayedTracks();           // Fetch recently played tracks
  }, []);                                  // Run only once on component mount

  return (
    <div className="profile-container">  {/* Container for the user profile */}
      <Nav />                               {/* Navigation component */}
      <div className="profile-header">      {/* Header section of the profile */}
        <img
          src={                              
            userData.images?.[0]?.url ||     // Display user's profile picture, fallback to default
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile"                     // Alternative text for the profile image
        />
        <h1>{userData.display_name}</h1>   {/* Display user's name */}
        <p>
          {userData.country}                 {/* Display the country code */}
          <Flag
            code={userData.country || "UN"}  // Use the country flag or "UN" as a fallback
            style={{ width: "1.5em", height: "1.5em", marginLeft: "0.5em" }} 
          />
        </p>
      </div>
      <div className="section">             {/* Section for top tracks */}
        <h1>Top Tracks</h1>
        <ul>
          {userFavoritesTracks.map((track) => (  // Map through top tracks and render each using TrackCard component
            <TrackCard key={track.id} id={track.id} />
          ))}
        </ul>
      </div>
      <div className="section">             {/* Section for saved playlists */}
        <h1>Saved Playlists</h1>
        <ul>
          {userPlaylists.map((playlist) => (   // Map through playlists and render each using PlaylistCard component
            <PlaylistCard key={playlist.id} id={playlist.id} />
          ))}
        </ul>
      </div>
      <div className="section">             {/* Section for recently played tracks */}
        <h1>Recently Played Tracks</h1>
        <ul>
          {recentlyTracks.map((track) => (     // Map through recently played tracks and render each using TrackCard component
            <TrackCard key={track.track.id} id={track.track.id} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;  // Export the UserProfile component
