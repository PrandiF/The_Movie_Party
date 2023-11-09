const router = require("express").Router();
const passport = require("passport");
const envs = require("../config/envs");

router.get("/user/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "successfully loged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/user/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "log in failure",
  });
});

router.get(
  "/home",
  passport.authenticate("google", {
    successRedirect: envs.CLIENT_URL,
    failureRedirect: "/user/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("user/logout", (req, res) => {
  req.logOut();
  res.redirect(envs.CLIENT_URL);
});

module.exports = router;
