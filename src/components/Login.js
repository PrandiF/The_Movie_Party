import React, { useState } from "react";
import axios from "axios";

import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router";
import "./login.css";
import { Link } from "react-router-dom";
import logo from "../public/logo1.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((input) => {
      return { ...input, [name]: value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Debes completar todos los campos requeridos");
    }
    axios
      .post("http://localhost:3001/api/user/login", formData, {
        withCredentials: true,
      })
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
        navigate("/home");
      });
  };
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
      <img src={logo} width="250px" />
      <form className="form" onSubmit={onSubmit}>
        <div className="flex-column">
          <label style={{ color: "rgb(19, 3, 138)" }}>Email </label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            type="text"
            className="input"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex-column">
          <label style={{ color: "rgb(19, 3, 138)" }}>Password </label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="button-submit">Sign In</button>
        <p className="p">
          Don't have an account?{" "}
          <Link to="/user/register" className="span">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
