import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Callback from "./components/callback";
import ElectronicArtists from "./components/electronicArtists";
import SearchInput from "./components/searchInput";
import Detail from "./components/detail";

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
