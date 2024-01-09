import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./navbar.css";
import useInput from "../hooks/useInput";
import logo from "../public/logo1.png";

function NavBar() {
  const navigate = useNavigate();

  const search = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/movies/${search.value}`);
  };
  const clickLogOut = () => {
    axios.post(
      "http://localhost:3001/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    navigate("/");
  };

  return (
    <nav
      className="navbar is-transparent"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Link to="/user/movies">
        <img
          src={logo}
          style={{ width: "100px", height: "35px", margin: "10px" }}
          alt="logo"
        />
      </Link>

      <div className="navbar-item navbar-end">
        <Link to="/user/movies">
          <button className="navButton">Movies</button>
        </Link>
        <Link to="/user/tv-shows">
          <button className="navButton">Tv Shows</button>
        </Link>
        <Link>
          <button className="navButton">My List</button>
        </Link>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input
              {...search}
              placeholder="Search..."
              type="text"
              name="search"
            />
          </form>
        </div>
      </div>
      <div className="navbar-item navbar-end">
        <button className="cta" onClick={clickLogOut}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
