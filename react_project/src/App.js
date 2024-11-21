import React, { useState, useEffect } from 'react';

const App = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  // URL de autorización
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=9d43bd4692cb45139ded371e78052e22&response_type=token&redirect_uri=http://localhost:3000/callback&scope=user-read-private`;

  // Verificar si hay un token en la URL (después del login)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenFromHash = hash
        .substring(1)
        .split('&')
        .find((item) => item.startsWith('access_token'))
        ?.split('=')[1];
      if (tokenFromHash) {
        setToken(tokenFromHash);
        window.location.hash = ''; // Limpia la URL
      }
    }
  }, []);

  // Obtener datos del perfil de Spotify
  const fetchProfile = async () => {
    if (!token) return;

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    } else {
      console.error('Error fetching profile', response.status);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Spotify API Example</h1>

      {!token && (
        <a href={SPOTIFY_AUTH_URL}>
          <button>Iniciar sesión con Spotify</button>
        </a>
      )}

      {token && (
        <div>
          <button onClick={fetchProfile}>Obtener Perfil</button>
          {profile && (
            <div>
              <h2>Bienvenido, {profile.display_name}</h2>
              <p>Email: {profile.email}</p>
              <img src={profile.images[0]?.url} alt="Avatar" width="150" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
