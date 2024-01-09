import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./register.css";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import logo from "../public/logo1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import PswRequirements from "./PswRequirements";
import { Alert } from "react-bootstrap";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [samePasswordAlert, setSamePasswordAlert] = useState(false);
  const [registerUserAlert, setRegisterUserAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((input) => {
      return { ...input, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setShowAlert(true);
    }
    if (formData.password !== formData.confirmPassword) {
      setSamePasswordAlert(true);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        formData,
        { withCredentials: true }
      );
      
      setRegisterUserAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleBackButton = () => {
    navigate('/')
  }

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #ffffff, #000033)",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className="form" onSubmit={onSubmit}>
        <button className="backButton" onClick={handleBackButton}>⬅ Back</button>
          <p className="welcomeMessage">Sign Up now and enjoy the party. </p>
          <div className="firstAndLastName">
            <input
              required=""
              placeholder="First Name"
              type="text"
              className="input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              required=""
              placeholder="Last Name"
              type="text"
              className="input"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <input
              required=""
              placeholder="Email"
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div>
              <input
                required=""
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="showPswBtn" onClick={togglePasswordVisibility}>
                Mostrar Contraseña
              </p>
            </div>
            {formData.password.length >= 1 ? <PswRequirements /> : ""}
            <div>
              <input
                required=""
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p
                className="showPswBtn"
                onClick={toggleConfirmPasswordVisibility}
              >
                Mostrar Contraseña
              </p>
            </div>
          </div>
          <button className="submit">Sign Up</button>
          {showAlert ? (
            <Alert variant="danger">✖️ Debes completar todos los campos.</Alert>
          ) : (
            ""
          )}
          {samePasswordAlert ? (
            <Alert variant="danger">✖️ Las contraseñas no coinciden.</Alert>
          ) : (
            ""
          )}
          {registerUserAlert ? (
            <Alert variant="success">✔️ Usuario registrado correctamente.</Alert>
          ) : (
            ""
          )}
          <Link to="/" className="span">
            {" "}
            Already have an acount? Sign In
          </Link>{" "}
          
        </form>
      </div>
      <img alt="" src={logo} width="300px" />
    </div>
  );
}

export default Register;
