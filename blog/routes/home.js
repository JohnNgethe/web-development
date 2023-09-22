const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Home Route
router.get("/", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const posts = await Post.find({ author: req.user._id });
      res.render("home", {
        posts: posts,
        currentUser: req.user,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching posts.");
  }
});

module.exports = router;
