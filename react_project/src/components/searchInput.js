import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ArtistCard from "./artistCard";
import Nav from "../view/nav";
import { Box, TextField } from "@mui/material";
import "./searcInput.css";

const SearchInput = () => {
  const location = useLocation();
  const initialQuery = location.state?.query || "";
  const [searchText, setSearchText] = useState(initialQuery);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("No artists searched");
  const [isSearching, setIsSearching] = useState(false); // To track if the search is happening
  const itemsPerPage = 20;

  let query;

  const debounceTimeout = useRef(null); // Reference to store the timeout ID

  const fetchArtists = async (query) => {
    if (!query.trim()) {
      setArtists([]); // Clear previous results when search is empty
      setMessage("No artist searched.");
      return;
    }

    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    setIsSearching(true); // Indicate that the search is happening

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
      setMessage(""); // Clear message if there are artists
    } catch (error) {
      console.error("Error fetching artists:", error);
      setMessage("Error fetching artists.");
    } finally {
      setIsSearching(false); // Indicate that the search has finished
    }
  };

  // Handle changes to the search input with debounce
  const handleInputChange = (e) => {
    query = e.target.value;
    setSearchText(query);

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay the API call
    debounceTimeout.current = setTimeout(() => {
      fetchArtists(query);
    }, 500); // 500ms delay for debounce
  };

  return (
    <div>
      <Nav />
      <h1>Search Results for EDM Artists</h1>
      <Box sx={{ width: 300, margin: 20, display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={searchText}
          onChange={handleInputChange}
          id="standard-basic"
          label="Search for EDM Artists"
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: '25px',
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px',
              paddingRight: '40px', // Adjust the padding to fit the icon
            },
            '& .MuiInputLabel-root': {
              color: '#555',
            },
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              padding: '10px 14px',
            },
          }}
        />
      </Box>
      {message && <p className="message">{message}</p>}
      {isSearching && <p>Searching...</p>} {/* Show "Searching..." while the request is in progress */}
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
