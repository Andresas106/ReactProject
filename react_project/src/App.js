import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Callback from "./components/callback";
import ElectronicArtists from "./components/electronicArtists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/artists" element={<ElectronicArtists />} />
      </Routes>
    </Router>
  );
}

export default App;
