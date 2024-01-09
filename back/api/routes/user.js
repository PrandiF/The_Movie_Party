const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/token");
const validateUser = require("../middlewares/auth");
const validate = require("../utils/validations")

//RUTAS GET
router.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});
router.get("/secret", validateUser, (req, res) => {
  res.send(req.user);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

//RUTAS POST
router.post("/register", async (req, res) => {
  const { email, name, lastname, password, confirmPassword } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Nombre no proporcionado." });
  }
  if (!lastname) {
    return res
      .status(400)
      .json({ message: "Apellido no proporcionado." });
  }
  if (!email) {
    return res.status(400).json({ message: "Email no proporcionado." });
  }
  if (!validate.email(email)) {
    return res
      .status(400)
      .json({ message: "El email tiene un formato incorrecto." });
  }
  if (!password) {
    return res.status(400).json({ message: "Contraseña no proporcionada." });
  }
  if (!validate.name(name)) {
    return res
      .status(400)
      .json({ message: "El nombre contiene caracteres inválidos." });
  }
  if (!validate.lastname(lastname)) {
    return res
      .status(400)
      .json({ message: "El nombre contiene caracteres inválidos." });
  }
  if (!validate.password(password)) {
    return res.status(400).json({
      message:
        "La nueva contraseña no cumple con los requisitos mínimos:\n" +
        "✓ Solo letras y números.\n" +
        "✓ 1 letra mayúscula.\n" +
        "✓ 1 letra minúscula.\n" +
        "✓ 1 número.\n" +
        "✓ 8 caracteres de largo.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  }
  try{
      const newUser = await User.create({
        name,
        lastname,
        email,
        password
      });
      const userResponse = { ...newUser.toJSON(), password: undefined };
      res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
  
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email no proporcionado." });
  }
  if (!validate.email(email)) {
    return res
      .status(400)
      .json({ message: "El email no tiene un formato correcto." });
  }
  if (!password) {
    return res.status(400).json({ message: "Contraseña no proporcionada." });
  }
try{
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado." });
  }
   user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.status(400).json({ message: "Contraseña inválida." });
      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };
      const token = generateToken(payload);
      res.cookie("token", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
      res.send(payload);
    });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error de servidor." });
}
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

router.use("/", function (req, res) {
  res.sendStatus(404);
});
module.exports = router;
