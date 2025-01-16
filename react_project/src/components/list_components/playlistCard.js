import React from "react";
import { useInView } from "react-intersection-observer";

const PlaylistCard = ({ id }) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });

    return (
        <li ref={ref}>
            {inView && (
                <iframe
                    src={`https://open.spotify.com/embed/playlist/${id}`}
                    width="300"
                    height="80"
                    allow="encrypted-media"
                ></iframe>
            )}
        </li> 
    );
};

export default PlaylistCard;
