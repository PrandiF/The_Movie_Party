import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/allMovies.css";
import MovieVideo from "../components/MovieVideo";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function IndividualMovie() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";
  const [movieInfo, setMovieInfo] = useState({});
  const [movieVideoKey, setMovieVideoKey] = useState("");
  const { movie_id } = useParams();
  const { idUsuario } = useParams();
  const [movieFav, setMovieFav] = useState(false);

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

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,

        {
          params: { api_key: apiKey },
        }
      )
      .then((response) => {
        const videos = response.data.results; // Accede a la propiedad "results" para obtener la lista de videos
        if (videos.length > 0) {
          const firstVideoKey = videos[0].key; // Obtén la clave del primer video (puedes ajustar esto según tus necesidades)
          setMovieVideoKey(firstVideoKey); // Establece la clave del video en el estado
        }
      })

      .catch((error) => {
        console.error("Error fetching tv video:", error);
      });
  }, [movie_id]);

  // const handleAddToFavorites = () => {
  //   axios
  //     .post(
  //       `http://localhost:3001/api/user/me/peliculas/${movie_id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       alert(res.data.message);
  //       setMovieFav(true); // Muestra un mensaje de éxito
  //     })
  //     .catch((error) => {
  //       console.error("Error al agregar película a favoritos:", error);
  //       alert(
  //         "Error al agregar película a favoritos. Por favor, intenta nuevamente más tarde."
  //       );
  //     });
  // };

  // const handleDeleteFromFavorites = () => {
  //   axios
  //     .delete(`http://localhost:3001/api/user/me/peliculas/${movie_id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       alert(res.data.message); // Muestra un mensaje de éxito
  //       setMovieFav(false);
  //       // Puedes actualizar la lista de películas favoritas si lo deseas
  //     })
  //     .catch((error) => {
  //       console.error("Error al eliminar película de favoritos:", error);
  //       alert(
  //         "Error al eliminar película de favoritos. Por favor, intenta nuevamente más tarde."
  //       );
  //     });
  // };

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
            src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
            alt="poster"
            className="individualImg"
          />

          <div>
            <div>
              <h2>{movieInfo.title}</h2>
              <p className="tagline">{movieInfo.tagline}</p>
            </div>
            <p className="individualInfo" style={{ marginBottom: "1rem" }}>
              {movieInfo.overview}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="individualInfo">
                <p>Duration: {movieInfo.runtime} minutes</p>
                <p>Year: {movieInfo.release_date}</p>
                <p>Vote Average: {movieInfo.vote_average}</p>
              </div>
              <div className="addItemButtonContainer">
                {!movieFav ? (
                  <button
                    className="addItemButton"
                    type="button"
                    // onClick={handleAddToFavorites}
                  >
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
                ) : (
                  <button
                    className="deleteItemButton"
                    type="button"
                    // onClick={handleDeleteFromFavorites}
                  >
                    <span className="button__text">Delete from My List</span>
                  </button>
                )}

                <button
                  className="trailerButton"
                  type="button"
                  onClick={handleOpenVideo}
                >
                  <span className="button__text">Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoOpen ? (
        <MovieVideo videoKey={movieVideoKey} onClose={handleCloseVideo} />
      ) : (
        ""
      )}
    </div>
  );
}

export default IndividualMovie;
