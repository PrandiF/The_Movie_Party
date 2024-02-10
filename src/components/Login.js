import React, { useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router";
import "../styles/login.css";
import { Link } from "react-router-dom";
import logo from "../public/logo1.png";
import { Alert } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [userNotFoundAlert, setUserNotFoundAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((input) => {
      return { ...input, [name]: value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setShowAlert(true);
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
      })
      .catch(() => {
        setUserNotFoundAlert(true)
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ffffff, #000033)",

        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img src={logo} width="300px" alt="logo" />
      <form className="form" onSubmit={onSubmit}>
        {/* <div className="flex-column">
          <label style={{ color: "rgb(19, 3, 138)" }}>Email </label>
        </div> */}
        <h2 className="welcomeTitle">Welcome</h2>
        <div className="inputs">
          <input
            type="text"
            className="input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ? ( <p className="showPswBtn" onClick={togglePasswordVisibility}>
            Ocultar Contraseña
          </p>) :(<p className="showPswBtn" onClick={togglePasswordVisibility}>
            Mostrar Contraseña
          </p>)}
          
        </div>

        <button className="button-submit">Sign In</button>

        {showAlert ? <Alert variant="danger">Debes completar todos los campos.</Alert> : ""}
        {userNotFoundAlert ? <Alert variant="danger">Usuario no encontrado.</Alert> : ""}
        <Link to="/user/register" className="span">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
