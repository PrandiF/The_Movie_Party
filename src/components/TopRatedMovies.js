import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/allMovies.css";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function TopRatedMovies() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";

  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/top_rated", {
        params: {
          api_key: apiKey,
        },
      })
      .then((res) => res.data)
      .then((movies) => {
        setMovieList(movies.results);
        console.log(movieList);
      })
      .catch((error) => console.error(error));
  }, []);

  const history = useNavigate();

  const handleBackButton = () => {
    history(-1);
  };

  return (
    <div className="fondo">
      <NavBar />
      <div style={{ display: "flex", padding: "1rem" }}>
        <button className="backButton" onClick={handleBackButton}>
          <IoArrowBackCircleSharp style={{ marginRight: "5px" }} /> Back
        </button>
        <h2 style={{ margin: "auto" }}>Top Rated</h2>
      </div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main id="main">
          {movieList.map((movie) => (
            <div className="movie">
              <Link to={`/user/movies/single/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt="image"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <span>{movie.vote_average}</span>
                </div>
                <div className="overview">
                  <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                    Description
                  </h3>
                  {movie.overview}
                </div>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default TopRatedMovies;
