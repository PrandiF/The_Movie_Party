import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Busqueda() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";
  const [encontradas, setEncontradas] = useState([]);
  const { busqueda } = useParams();

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/search/multi", {
        params: {
          query: busqueda,
          api_key: apiKey,
          page: "1",
        },
      })
      .then((res) => res.data)
      .then((movies) => {
        const moviesConImg = movies.results.filter(
          (movie) => movie.poster_path != undefined
        );
        setEncontradas(moviesConImg);
      })
      .catch((error) => console.error(error));
  }, [busqueda]);

  return (
    <div className="fondo">
      <NavBar />
      <main id="main">
        {encontradas.map((movie) => (
          <div className="movie" key={movie.id}>
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
  );
}

export default Busqueda;
