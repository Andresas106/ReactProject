import React from "react";

const ArtistCard = ({ id, name, followers, firstImage }) => {
    return (
        <li key={id} className="artist-card">
            <h3 className="artist-card-title">{name}</h3>
            <p className="artist-card-followers">{followers} followers</p>
            <img className="artist-card-image" src={firstImage} alt={name} width="100" />
        </li>
    );
};

export default ArtistCard;
