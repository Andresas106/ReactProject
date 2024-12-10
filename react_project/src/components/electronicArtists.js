import React, { useState, useEffect } from "react";
import ArtistCard from "./artistCard";
import Nav from "../view/nav";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 20; 

  const fetchArtists = async (offset = 0) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    try {
      const url = `https://api.spotify.com/v1/search?q=genre:edm&type=artist&limit=${itemsPerPage}&offset=${offset}`;
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
      const artists = data.artists.items;

      setArtists(artists); 
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const fetchTopTwenty = async() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      console.error("No token found. Please authenticate first.");
      return;
    }

    let allArtists = [];
    let offset = 0;
    let limit = 20;

    try {
      while(true)
      {
        const url = `https://api.spotify.com/v1/search?q=genre:edm&type=artist&limit=${limit}&offset=${offset}`;
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
        const fetchedArtists = data.artists.items;

        if (fetchedArtists.length === 0) break; // Si no hay más resultados, terminamos

        allArtists = [...allArtists, ...fetchedArtists];
        offset += limit;

        if(offset >= data.artists.total) break;
      }
      

     

      const sortedArtists = allArtists.sort((a, b) => b.popularity - a.popularity);

      const first20Artists = sortedArtists.slice(0, 20);
      setTopArtists(first20Artists); 
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchArtists(nextPage * itemsPerPage); 
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchArtists(prevPage * itemsPerPage);
    }
  };

  useEffect(() => {
    fetchArtists(currentPage * itemsPerPage);
    fetchTopTwenty();
  }, [currentPage]);

  return (
    <div>
      <Nav></Nav>
      <div> 
      <h1>Edm Artists</h1> 
            <ul>
              {artists.map((artist) => (
                <ArtistCard key={artist.id} id={artist.id} name={artist.name} followers={artist.followers.total} firstImage={artist.images[0]?.url}></ArtistCard>
              ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
              <button onClick={handleNextPage}>
                Next
              </button>
            </div>
      </div>
      <div>
        <h1>Top 20 EDM Artists</h1>
        <ul>
              {topArtists.map((artist) => (
                <ArtistCard key={artist.id} id={artist.id} name={artist.name} followers={artist.followers.total} firstImage={artist.images[0]?.url}></ArtistCard>
              ))}
            </ul>
      </div>
    </div>
  );
};

export default AllArtists;
