import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Sidebar() {
  return (
    <aside
      className="menu column is-one-quarter"
      style={{
        maxWidth: "fit-content",
      }}
    >
      <div className="is-flex is-justify-content-space-between"></div>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <li>
          <Link to="/user/movies/now-playing">
            <button className="sideButton">Now Playing</button>
          </Link>
        </li>
        <li>
          <Link to="/user/movies/popular">
            <button className="sideButton">Popular</button>
          </Link>
        </li>
        <li>
          <Link to="/user/movies/top-rated">
            <button className="sideButton">Top Rated</button>
          </Link>
        </li>
        <li>
          <Link to="/user/movies/upcoming">
            <button className="sideButton">Upcoming</button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
