import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AllTvShows from "./components/tvShows/AllTvShows";
import AllMovies from "./components/AllMovies";
// import Start from "./components/Start";
import PopularMovies from "./components/PopularMovies";
import NowPlayingMovies from "./components/NowPlayingMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import Busqueda from "./components/Busqueda";
import AiringToday from "./components/tvShows/AiringToday";
import Popular from "./components/tvShows/Popular";
import TopRated from "./components/tvShows/TopRated";
import IndividualMovie from "./commons/IndividualMovie";
import IndividualTvShow from "./commons/IndividualTvShow";

function App() {
  return (
    
      <div>
        <Routes>
          {/* <Route path="/" element={<Start />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/home" element={<AllMovies />} />
          <Route path="/user/tv-shows" element={<AllTvShows />} />
          <Route path="/user/movies" element={<AllMovies />} />
          <Route path="/user/movies/popular" element={<PopularMovies />} />
          <Route
            path="/user/movies/now-playing"
            element={<NowPlayingMovies />}
          />
          <Route path="/user/movies/top-rated" element={<TopRatedMovies />} />
          <Route path="/user/movies/upcoming" element={<UpcomingMovies />} />
          <Route path="/user/movies/:busqueda" element={<Busqueda />} />
          <Route path="/user/tv-shows/airing-today" element={<AiringToday />} />
          <Route path="/user/tv-shows/popular" element={<Popular />} />
          <Route path="/user/tv-shows/top-rated" element={<TopRated />} />
          <Route
            path="/user/movies/single/:movie_id"
            element={<IndividualMovie />}
          />
          <Route
            path="/user/tv-shows/single/:series_id"
            element={<IndividualTvShow />}
          />
        </Routes>
      </div>
    
  );
}

export default App;
