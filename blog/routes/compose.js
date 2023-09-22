const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Post = require("../models/post");

// Compose Route (GET)
router.get("/", isLoggedIn, (req, res) => {
  res.render("compose", { currentUser: req.user });
});

// Compose Route (POST)
router.post("/", isLoggedIn, (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.user._id,
  });
  post.save();
  res.redirect("/");
});

module.exports = router;
