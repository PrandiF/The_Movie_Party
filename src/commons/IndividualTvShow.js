import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/allMovies.css";
import TvVideo from "../components/TvVideo";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function IndividualTvShow() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";
  const [tvShowInfo, setTvShowInfo] = useState({});
  const [tvVideoKey, setTvVideoKey] = useState("");
  const { series_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${series_id}`, {
        params: { api_key: apiKey },
      })
      .then((res) => {
        const serie = res.data;
        setTvShowInfo(serie);
      })

      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [series_id]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${series_id}/videos?language=en-US`,

        {
          params: { api_key: apiKey },
        }
      )
      .then((response) => {
        const videos = response.data.results; // Accede a la propiedad "results" para obtener la lista de videos
        if (videos.length > 0) {
          const firstVideoKey = videos[0].key; // Obtiene la clave del primer video
          setTvVideoKey(firstVideoKey); // Establece la clave del video en el estado
        }
      })

      .catch((error) => {
        console.error("Error fetching movie video:", error);
      });
  }, [series_id]);

  const [videoOpen, setVideoOpen] = useState(false);

  const handleOpenVideo = () => {
    setVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoOpen(false);
  };

  const history = useNavigate();

  const handleBackButton = () => {
    history(-1);
  };
  return (
    <div>
      <div className={`${videoOpen ? "blurred" : "fondo"}`}>
        <NavBar />
        <button className="backButton" onClick={handleBackButton}>
          <IoArrowBackCircleSharp style={{ marginRight: "5px" }} /> Back
        </button>
        <div className="individualContainer">
          <img
            src={`https://image.tmdb.org/t/p/w200/${tvShowInfo.poster_path}`}
            alt="poster"
            className="individualImg"
          />
          <div>
            <div>
              <h2>{tvShowInfo.name}</h2>
              <p className="tagline">{tvShowInfo.tagline}</p>
            </div>
            <p className="individualInfo" style={{ marginBottom: "1rem" }}>
              {tvShowInfo.overview}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="individualInfo">
                <p>Seasons: {tvShowInfo.number_of_seasons}</p>
                <p>Episodes: {tvShowInfo.number_of_episodes}</p>
                <p>First Air date: {tvShowInfo.first_air_date}</p>
                <p>Last Air date: {tvShowInfo.last_air_date}</p>
                <p>Vote Average: {tvShowInfo.vote_average}</p>
              </div>
              <div className="addItemButtonContainer">
                <button className="addItemButton" type="button">
                  <span className="button__text">Add to My List</span>
                  <span className="button__icon">
                    <svg
                      className="svg"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </span>
                </button>
                {/* <button
                  className="trailerButton"
                  type="button"
                  onClick={handleOpenVideo}
                >
                  <span className="button__text">Trailer</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoOpen ? (
        <div className="trailer">
          <TvVideo videoKey={tvVideoKey} onClose={handleCloseVideo} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default IndividualTvShow;
