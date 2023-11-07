import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./register.css";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import logo from "../public/logo1.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((input) => {
      return { ...input, [name]: value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Debes completar todos los campos requeridos");
    } else {
      axios
        .post("http://localhost:3001/api/user/register", formData)
        .then(() => {
          setFormData({
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/user/login");
        })
        .catch((error) => console.error(error));
    }
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
        gap: "2rem",
      }}
    >
      <img src={logo} width="200px" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className="form" onSubmit={onSubmit}>
          <p className="title">Welcome </p>
          <p className="message">Sign Up now and enjoy the party. </p>
          <div className="flex">
            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                required=""
                placeholder=""
                type="text"
                className="input"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              required=""
              placeholder=""
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required=""
              placeholder=""
              type="password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span>Password</span>
          </label>
          <label>
            <input
              required=""
              placeholder=""
              type="password"
              className="input"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span>Confirm password</span>
          </label>

          <button className="submit">Sign Up</button>
          <p className="signin">
            Already have an acount ? <Link to="/user/login">Sign In</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
