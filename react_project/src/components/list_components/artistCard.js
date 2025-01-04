import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ id, name, followers, firstImage }) => {

  const navigate = useNavigate();

  const detail = () => {
    navigate('/detail/' + id);
  };



    return (
        <li key={id} className="artist-card" onClick={detail}>
            <h3 className="artist-card-title">{name}</h3>
            <p className="artist-card-followers">{followers} followers</p>
            <img className="artist-card-image" src={firstImage} alt={name} width="100" />
        </li>
    );
};

export default ArtistCard;
