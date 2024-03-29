import React from "react";

import "../styles/video.css";


function TvVideo({ videoKey, onClose }) {
  const embedUrl = `https://www.youtube.com/embed/${videoKey}`;
  return (
    <div className="videoContainer">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube Video"
        allowFullScreen
      ></iframe>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default TvVideo;