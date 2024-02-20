const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/token");
const validateUser = require("../middlewares/auth");
const validate = require("../utils/validations");

//RUTAS GET
router.get("/", (req, res) => {
  User.findAll().then((users) => res.send(users));
});
router.get("/secret", validateUser, (req, res) => {
  res.send(req.user);
});

// router.get("/me", validateUser ,async (req, res) => {
//   const userDni = req.user.dni;

//   console.log("Valor de userDni:", userDni);

//   try {
//     const user = await User.findOne({
//       where: { dni: userDni },
//       attributes: ["name", "lastname", "dni", "email", "password"],
//     });

//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado." });
//     }

//     res.json(user.get({ plain: true }));
//   } catch (error) {
//     console.error("Error al obtener los datos del usuario:", error);
//     res.status(500).send("Error de servidor");
//   }
// });

//RUTAS POST
router.post("/register", async (req, res) => {
  const { email, name, lastname, dni, password, confirmPassword } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Nombre no proporcionado." });
  }
  if (!lastname) {
    return res.status(400).json({ message: "Apellido no proporcionado." });
  }
  if (!email) {
    return res.status(400).json({ message: "Email no proporcionado." });
  }
  if (!dni) {
    return res.status(400).json({ message: "DNI no proporcionado." });
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
  if (!validate.dni(dni)) {
    return res
      .status(400)
      .json({ message: "El DNI contiene caracteres inválidos." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  }
  try {
    const newUser = await User.create({
      name,
      lastname,
      email,
      dni,
      password,
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
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }
    user.validatePassword(password).then((isValid) => {
      if (!isValid)
        return res.status(400).json({ message: "Contraseña inválida." });
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

// Ruta para agregar una película a la lista de favoritos del usuario
// router.post("/me/peliculas/:peliculaId", validateUser, async (req, res) => {
//   try {
//     const usuario = await User.findByPk(req.user.id); // Obtener el usuario autenticado
//     if (!usuario) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     // Obtener el ID de la película de los parámetros de la URL
//     const peliculaId = req.params.peliculaId;

//     // Agregar la película a la lista de favoritos del usuario
//     usuario.peliculasFavoritas.push(peliculaId);
//     await usuario.save();

//     res
//       .status(200)
//       .json({
//         message: "Película agregada a la lista de favoritos del usuario",
//       });
//   } catch (error) {
//     console.error("Error al agregar película favorita:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// Ruta para obtener la lista de películas favoritas del usuario
// router.get("/me/peliculas", validateUser, async (req, res) => {
//   try {
//     const usuario = await User.findByPk(req.user.id); // Obtener el usuario autenticado
//     if (!usuario) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     // Obtener la lista de películas favoritas del usuario
//     const peliculasFavoritas = usuario.peliculasFavoritas;

//     res.status(200).json({ peliculasFavoritas });
//   } catch (error) {
//     console.error("Error al obtener películas favoritas:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// Ruta para eliminar una película de la lista de favoritos del usuario
// router.delete("/me/peliculas/:peliculaId", validateUser, async (req, res) => {
//   try {
//     const usuario = await User.findByPk(req.user.id); // Obtener el usuario autenticado
//     if (!usuario) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     // Busca la posición de la película en la lista de favoritos del usuario
//     const index = usuario.peliculasFavoritas.indexOf(req.params.peliculaId);
//     if (index === -1) {
//       return res
//         .status(404)
//         .json({
//           error: "Película no encontrada en la lista de favoritos del usuario",
//         });
//     }

//     // Elimina la película de la lista de favoritos del usuario
//     usuario.peliculasFavoritas.splice(index, 1);
//     await usuario.save();

//     res
//       .status(200)
//       .json({
//         message: "Película eliminada de la lista de favoritos del usuario",
//       });
//   } catch (error) {
//     console.error(
//       "Error al eliminar película de la lista de favoritos:",
//       error
//     );
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

module.exports = router;
