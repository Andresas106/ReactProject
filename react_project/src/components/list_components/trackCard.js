import React from "react";

const TrackCard = ({ id }) => {
    return (
        <li>
            <iframe
            src={`https://open.spotify.com/embed/track/${id}`}
            width="300"
            height="80"
            allow="encrypted-media"
        ></iframe>
        </li> 
    );
};

export default TrackCard;
