import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/allMovies.css";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function MyList() {
  const location = useLocation();
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useNavigate();

  const handleBackButton = () => {
    history(-1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/me/peliculas", {
        withCredentials: true,
      })
      .then((res) => {
        setMovieList(res.data.peliculasFavoritas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setError("Error al cargar las películas. Por favor, intenta nuevamente más tarde.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  return (
    <>
      <div className="fondo">
        <NavBar />
        <div className="fondo" style={{ display: "flex" }}>
        <button className="backButton" onClick={handleBackButton}>
          <IoArrowBackCircleSharp style={{ marginRight: "5px" }} /> Back
        </button>
          <main id="main">
            {movieList.map((movie) => (
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
      </div>
    </>
  )
}

export default MyList