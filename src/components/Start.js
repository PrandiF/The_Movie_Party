import React from "react";
import { Link } from "react-router-dom";
import "./start.css";
import logo from "../public/logo1.png";

function Start() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ffffff, #000033)",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <img src={logo} width="250px" alt="logo" />
      <div>
        <h1 style={{ fontSize: "40px" }}>Welcome to The Movie Party</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2>
          Press
          <Link to="/user/login">
            <button className="btn">
              <i className="animation"></i>START<i className="animation"></i>
            </button>
          </Link>
          to join it.
        </h2>
      </div>
    </div>
  );
}

export default Start;
