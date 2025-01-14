import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../components/shared/nav/nav";
import { useEffect, useState } from "react";
import TrackCard from "../../components/list_components/trackCard";
const AlbumList = () => {
  const {id, name} = useParams();
  const [tracks, SetTracks] = useState([]);
  const navigate = useNavigate();


  const fetchTracks = async () => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = 'https://api.spotify.com/v1/albums/' + id + '/tracks';
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
      const tracks = data.items;
      SetTracks(tracks); 


    } catch (error) {
      console.error("Error fetching album tracks:", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [id.id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Nav />
      <div>
        <div>
          <h2> {name} Tracks</h2> 
          <ul>
            {tracks.map((track) => (
              <TrackCard key={track.id} id={track.id} />
            ))}
          </ul>
        </div>
        <button onClick={goBack}>Back</button>
      </div>
      
    </div>
  );
};

export default AlbumList;
