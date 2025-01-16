import React from "react";
import { useInView } from "react-intersection-observer";

const TrackCard = ({ id }) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <li ref={ref}>
            {inView && (
                <iframe
                    src={`https://open.spotify.com/embed/track/${id}`}
                    width="300"
                    height="80"
                    allow="encrypted-media"
                ></iframe>
            )}
        </li> 
    );
};

export default TrackCard;
