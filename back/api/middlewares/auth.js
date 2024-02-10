
const { validateToken } = require("../config/token");

function validateUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación no proporcionado." });
  }

  try {
    const { payload } = validateToken(token);

    if (!payload) {
      return res.status(401).json({ message: "Token de autenticación inválido." });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Error al validar el token:", error);
    return res.status(401).json({ message: "Error al validar el token." });
  }
}

module.exports = validateUser;
