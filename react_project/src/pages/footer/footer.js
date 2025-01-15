// Footer.js
import React from "react";
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>© {new Date().getFullYear()} Spotify Integration. All rights reserved.</p>
      <p>
        Powered by <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer">Spotify API</a>.
      </p>
    </footer>
  );
};

export default Footer;
