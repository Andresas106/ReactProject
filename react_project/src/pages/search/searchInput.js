import React, { useState, useRef } from "react";  // Importing necessary React hooks
import { useLocation } from "react-router-dom";  // Import useLocation hook from React Router
import ArtistCard from "../../components/list_components/artistCard";  // Importing ArtistCard component
import Nav from "../../components/shared/nav/nav";  // Importing the navigation bar component
import "../search/searcInput.css";  // Importing the CSS file for styling
import Footer from "../footer/footer.js"; // footer

/* Functional component for handling search input */
const SearchInput = () => {
  const location = useLocation();  // Getting location state from React Router
  const initialQuery = location.state?.query || "";  // Retrieve the initial search query from location state, or default to empty string
  const [searchText, setSearchText] = useState(initialQuery);  // State for storing the current search text
  const [artists, setArtists] = useState([]);  // State for storing search results (artists)
  const [message, setMessage] = useState("No artists searched");  // State for displaying message when no search results are found
  const [isSearching, setIsSearching] = useState(false);  // State to track if the search is currently happening
  const itemsPerPage = 20;  // Number of search results per page

  let query;  // Variable to store the current query

  const debounceTimeout = useRef(null);  // Reference to store the timeout ID for debounce

  /* Function to fetch artists based on the search query */
  const fetchArtists = async (query) => {
    if (!query.trim()) {
      setArtists([]);  // Clear previous results when search query is empty
      setMessage("No artist searched.");
      return;
    }

    const token = localStorage.getItem("spotifyAccessToken");  // Retrieve Spotify API token from local storage
    if (!token) {
      console.error("No token found. Please authenticate first.");  // Error message if token is missing
      return;
    }

    setIsSearching(true);  // Indicate that the search is in progress

    try {
      const url = `https://api.spotify.com/v1/search?q=genre:edm+${query}&type=artist&limit=${itemsPerPage}`;  // Spotify API search URL
      const response = await fetch(url, {  // Fetch request to Spotify API
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,  // Include the Spotify access token in the request header
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching search artists: ${response.statusText}`);  // Error handling for failed request
      }

      const data = await response.json();  // Parse the JSON response
      setArtists(data.artists.items);  // Update the artists state with search results
      setMessage("");  // Clear the message if search results are found
    } catch (error) {
      console.error("Error fetching search artists:", error);  // Log any error during the fetch
      setMessage("Error fetching artists.");  // Display error message to the user
    } finally {
      setIsSearching(false);  // Indicate that the search has finished
    }
  };

  /* Function to handle changes in the search input */
  const handleInputChange = (e) => {
    query = e.target.value;  // Update the query with the current input value
    setSearchText(query);  // Update the searchText state

    // Clear the previous timeout if exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay the API call
    debounceTimeout.current = setTimeout(() => {
      fetchArtists(query);  // Fetch artists after a delay of 500ms
    }, 500);  // 500ms delay to debounce API calls
  };

  return (
    <div>
      <Nav />  {/* Navigation bar */}
      <div className="search-header">
        <h1 className="search-title">Search Results for EDM Artists</h1>
        <input
          type="search"
          onChange={handleInputChange}  // Update search results on input change
          placeholder="Search for EDM Artists"  // Placeholder text for the input field
          value={searchText}  // Display current search text in the input field
        />
      </div>
      {message && <p className="message">{message}</p>}  {/* Display error message if exists */}
      {isSearching && <p className="searching-indicator">Searching...</p>}  {/* Display searching indicator */}
      <ul>
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            id={artist.id}
            name={artist.name}
            followers={artist.followers.total}
            firstImage={artist.images[0]?.url}  // Display the first image of the artist
          />
        ))}
      </ul>
      <Footer />
    </div>
    
  );
};

export default SearchInput;
