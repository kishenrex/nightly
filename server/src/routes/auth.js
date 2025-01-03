const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/calendar";

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
      });
    }
  });

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
  });
  

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router