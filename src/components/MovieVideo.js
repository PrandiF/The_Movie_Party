import "../styles/video.css";
import { FaWindowClose } from "react-icons/fa";

function MovieVideo({ videoKey, onClose }) {
  const embedUrl = `https://www.youtube.com/embed/${videoKey}`;
  return (
    <div className="overlay">
      <div className="allContainer">
        <div className="videoContainer">
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
          <button className="closeButton" onClick={onClose}>
            <FaWindowClose style={{width: "25px", height: "25px"}}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieVideo;
