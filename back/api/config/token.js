const jwt = require("jsonwebtoken");

const SECRET = "heladero";

function generateToken(data) {
  const token = jwt.sign(data, SECRET, { expiresIn: "4d" });
  return token;
}
function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };
