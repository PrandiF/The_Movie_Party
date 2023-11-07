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
        <Link onClick={clickLogOut} to={"/user/login"}>
          <p>Log Out</p>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
