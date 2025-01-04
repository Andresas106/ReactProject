import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Callback from "./pages/callback/callback";
import ElectronicArtists from "./pages/artists/electronicArtists";
import SearchInput from "./pages/search/searchInput";
import Detail from "./pages/detail/detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/artists" element={<ElectronicArtists />} />
        <Route path="/search" element= {<SearchInput />} />
        <Route path="/detail/:id" element = {<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
