import PlaylistCard from "../../components/list_components/playlistCard";
import TrackCard from "../../components/list_components/trackCard";
import Nav from "../../components/shared/nav/nav";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userData, SetUserData] = useState([]);
  const [userFavoritesTracks, SetUserFavoritesTracks] = useState([]);
  const [userPlaylists, SetUserPlaylists] = useState([]);
  const [recentlyTracks, SetRecentlyTracks] = useState([]);



  const fetchUserData = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/me';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching album tracks: ${response.statusText}`);
      }

      const data = await response.json();
      SetUserData(data); 


    } catch (error) {
      console.error("Error fetching album tracks:", error);
    }
  };

  const fetchTopTracks = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching top user tracks: ${response.statusText}`);
      }

      const data = await response.json();
      const tracks = data.items;
      SetUserFavoritesTracks(tracks); 
    } catch (error) {
      console.error("Error fetching top user tracks:", error);
    }
  };

  const fetchSavedPlaylists = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/me/playlists';
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user playlists: ${response.statusText}`);
      }

      const data = await response.json();
      const playlists = data.items;
      SetUserPlaylists(playlists);
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  };



  const fetchRecentlyPlayedTracks = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }
  
    let allTracks = [];
    let nextUrl = "https://api.spotify.com/v1/me/player/recently-played";
    const limit = 20;
  
    try {
      while (allTracks.length < limit && nextUrl) {
        const response = await fetch(nextUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching recently played tracks: ${response.statusText}`);
        }
  
        const data = await response.json();
        const newTracks = uniqueTracks(data.items, allTracks);
        allTracks = [...allTracks, ...newTracks];
        nextUrl = data.next;
      }

      const limitedTracks = allTracks.slice(0, limit);
      SetRecentlyTracks(limitedTracks);
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
    }
  };

  const uniqueTracks = (tracks) => {
    const seen = new Set();
    return tracks.filter((track) => {
      if (seen.has(track.track.id)) {
        return false;
      }
      seen.add(track.track.id);
      return true;
    });
  };

  useEffect(() => {
    fetchUserData();
    fetchTopTracks();
    fetchSavedPlaylists();
    fetchRecentlyPlayedTracks();
  }, []);


  return (
    <div>
      <Nav />
      <div>
        <h1>Spotify Profile</h1>
        <img src={userData.images?.[0]?.url || 
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
        alt="Photo profile" />
        <p><strong>Name:</strong> {userData.display_name}</p>
        <p><strong>Country:</strong> {userData.country}</p>
      </div>
      <div>
        <h1>Top {userData.display_name} tracks</h1>
        <ul>
        {userFavoritesTracks.map((track) => (
              <TrackCard key={track.id} id={track.id} />
            ))}
        </ul>
      </div>
      <div>
        <h1>{userData.display_name} Saved Playlists</h1>
        <ul>
        {userPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} id={playlist.id} />
            ))}
        </ul>
      </div>
      <div>
        <h1>Recently {userData.display_name} Played Tracks</h1>
        <ul>
        {recentlyTracks.map((track) => (
              <TrackCard key={track.track.id} id={track.track.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
