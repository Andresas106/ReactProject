import React from "react";

const PlaylistCard = ({ id }) => {
    return (
        <li>
            <iframe
            src={`https://open.spotify.com/embed/playlist/${id}`}
            width="300"
            height="380"
            allow="encrypted-media"
        ></iframe>
        </li> 
    );
};

export default PlaylistCard;
