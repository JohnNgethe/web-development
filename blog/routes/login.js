const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login (GET)
router.get("/", (req, res) => {
  res.render("login", { currentUser: req.user });
});

// Login (POST)
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

module.exports = router;
