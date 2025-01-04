import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumCard = ({ id, name, image, releaseDate }) => {

  const navigate = useNavigate();

  const album = () => {
    navigate('/album/' + id);
  };



    return (
        <li key={id} className="album-card" onClick={album}>
            <h3 className="album-card-name">{name}</h3>
            <p className="album-card-releasedate">{releaseDate}</p>
            <img className="album-card-image" src={image} alt={name} />
        </li>
    );
};

export default AlbumCard;
