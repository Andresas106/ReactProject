import React from "react";
import './home.css';


const CLIENT_ID = "094739ed119940bb8c913a9d086c4b34";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-top-read"
];

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${SCOPES.join("%20")}`;

const Home = () => {
  const redirectToSpotify = () => {
    window.location.href = AUTH_URL;
    
  };

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
    <button className="home-button" onClick={redirectToSpotify}>
    Iniciar sesión con Spotify
    </button>
</div>
  );
};

export default Home;
