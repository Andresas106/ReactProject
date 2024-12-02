import React from "react";

const ArtistCard = ({id, name, followers, firstImage}) => {
    return(
        <li key={id}>
            <h3>{name}</h3>
            <p>{followers} followers</p>
            <img src={firstImage} alt={name} width="100" />
        </li>
    );
};

export default ArtistCard;