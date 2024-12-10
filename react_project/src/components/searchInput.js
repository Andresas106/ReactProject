import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ArtistCard from "./artistCard";
import Nav from "../view/nav";

const SearchInput = () => {
  const location = useLocation();
  const initialQuery = location.state?.query || "";
  const [searchText, setSearchText] = useState(initialQuery);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("No artists searched");
  const [isSearching, setIsSearching] = useState(false); // To track if the search is happening
  const itemsPerPage = 20;
  
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
    const query = e.target.value;
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
      <Nav></Nav>
      <h1>Search Results for EDM Artists</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search for EDM artists"
      />
      {message && <p style={{ color: "red" }}>{message}</p>}
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
