import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code) {
      getAccessToken(code);
    }
  }, [location]);

  const getAccessToken = async (code) => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa("094739ed119940bb8c913a9d086c4b34:acb0f522e4484a46ab812da61d5e05d8"),
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/callback",
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.access_token) {
        localStorage.setItem("spotifyAccessToken", data.access_token);
        navigate("/artists");
      }
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
  };

  return <div>Procesando autenticación...</div>;
};

export default Callback;
