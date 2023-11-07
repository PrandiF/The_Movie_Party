const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/token");
const validateUser = require("../middlewares/auth");

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
router.post("/register", (req, res) => {
  const { email, name, lastname, password } = req.body;
  User.create({ email, name, lastname, password }).then((user) => {
    console.log("user", user);
    res.status(201).send(user);
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) return res.send(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.send(401);
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
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

router.use("/", function (req, res) {
  res.sendStatus(404);
});
module.exports = router;
