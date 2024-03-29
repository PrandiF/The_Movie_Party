import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/allMovies.css";
import NavBar from "../NavBar";
import SideBarTv from "./SideBarTv";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Popular() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";

  const [showList, setShowList] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular", {
        params: {
          api_key: apiKey,
        },
      })
      .then((res) => res.data)
      .then((shows) => {
        setShowList(shows.results);
        console.log(showList);
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
        <h2 style={{ margin: "auto" }}>Popular</h2>
      </div>
      <div style={{ display: "flex" }}>
        <SideBarTv />
        <main id="main">
          {showList.map((show) => (
            <div className="movie">
              <Link to={`/user/tv-shows/single/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
                  alt="image"
                />
                <div className="movie-info">
                  <h3>{show.name}</h3>
                  <span>{show.vote_average}</span>
                </div>
                <div className="overview">
                  <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                    Description
                  </h3>
                  {show.overview}
                </div>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Popular;
