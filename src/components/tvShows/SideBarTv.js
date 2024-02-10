import React from "react";
import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css";

function SideBarTv() {
  return (
    <aside
      className="menu column is-one-quarter"
      style={{ maxWidth: "fit-content" }}
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
          <Link to="/user/tv-shows/airing-today">
            <button className="sideButton">Airing Today</button>
          </Link>
        </li>
        <li>
          <Link to="/user/tv-shows/popular">
            <button className="sideButton">Popular</button>
          </Link>
        </li>
        <li>
          <Link to="/user/tv-shows/top-rated">
            <button className="sideButton">Top Rated</button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SideBarTv;
