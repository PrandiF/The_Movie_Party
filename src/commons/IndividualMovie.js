import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../components/allMovies.css";

function IndividualMovie() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";
  const [movieInfo, setMovieInfo] = useState({});
  const { movie_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
        params: { api_key: apiKey },
      })
      .then((res) => {
        const movie = res.data;
        setMovieInfo(movie);
      })

      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [movie_id]);
  return (
    <div className="fondo">
      <NavBar />
      <div className="individualContainer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
          alt="image"
          className="individualImg"
        />

        <div>
          <div>
            <h2>{movieInfo.title}</h2>
          </div>
          <p className="individualInfo" style={{ marginBottom: "1rem" }}>
            {movieInfo.overview}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="individualInfo">
              <p>Duration: {movieInfo.runtime} minutes</p>
              <p>Vote Average: {movieInfo.vote_average}</p>
              <p>Year: {movieInfo.release_date}</p>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualMovie;
