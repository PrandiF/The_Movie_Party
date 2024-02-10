import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import "../../styles/allMovies.css";
import SideBarTv from "./SideBarTv";

function AllTvShows() {
  const apiKey = "b90f754bb94dc55a080578b44ed781e1";

  const [showList, setShowList] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/on_the_air", {
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
  return (
    <div className="fondo">
      <NavBar />
      <h2>Tv Shows - On The Air</h2>

      <div style={{ display: "flex" }}>
        <SideBarTv />
        <main id="main">
          {showList.map((show) => (
            <div className="movie" key={show.id}>
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

export default AllTvShows;
