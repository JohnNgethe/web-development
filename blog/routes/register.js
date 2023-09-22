const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Register (GET)
router.get("/", (req, res) => {
  res.render("register", { currentUser: req.user });
});

// Register (POST)
router.post("/", (req, res) => {
  const { email, username, password } = req.body;
  const newUser = new User({ email, username });

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.error(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

module.exports = router;
