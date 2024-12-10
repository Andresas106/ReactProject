import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtistCard from "./artistCard";
import Nav from "../view/nav";


const SearchInput =  () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialQuery = location.state?.query || "";
    const [searchText, setSearchText] = useState(initialQuery);
    const [artists, setArtists] = useState([]);
    const [message, setMessage] = useState("");
    const itemsPerPage = 20;

    const fetchArtists = async (query) => {
        const token = localStorage.getItem("spotifyAccessToken");
        if (!token) {
          console.error("No token found. Please authenticate first.");
          return;
        }
    
        try {
          const url = `https://api.spotify.com/v1/search?q=genre:edm+${query}&type=artist&limit=${itemsPerPage}`;
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
          setArtists(data.artists.items);
        } catch (error) {
          console.error("Error fetching artists:", error);
        }
      };
    
      useEffect(() => {
        if (searchText.trim()) {
          fetchArtists(searchText);
          setMessage("");
        }
        else
        {
          setArtists([]);
          setMessage("No artists searched.");
        }
      }, [searchText, navigate]);
    
      const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchText(query);
      };
    
      return (
        <div>
          <Nav></Nav>
          <h1>Search Results for EDM Artists</h1>
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search for EDM artists"
          />
          <p style={{ color: "red" }}>{message}</p>
          <ul>
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                id={artist.id}
                name={artist.name}
                followers={artist.followers.total}
                firstImage={artist.images[0]?.url}
              />
            ))}
          </ul>
        </div>
      );
};

export default SearchInput;