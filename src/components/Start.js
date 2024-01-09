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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
          <h1 style={{ fontSize: "40px" }}>Welcome to The Movie Party</h1>
        
        
          <Link to="/user/login">
            <button className="btn">START</button>
          </Link>
        
      </div>
    </div>
  );
}

export default Start;
