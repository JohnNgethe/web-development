const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Post = require("../models/post");

// Single Post Route
router.get("/:postId", async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });

    if (post) {
      res.render("post", {
        title: post.title,
        content: post.content,
        post: post,
        currentUser: req.user,
      });
    } else {
      console.log("Post not found");
      res.status(404).send("Post not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the post.");
  }
});

// Delete Post Route
router.post("/:postId/delete", isLoggedIn, async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(requestedPostId);

    if (deletedPost) {
      console.log(`Deleted post with ID: ${requestedPostId}`);
      res.redirect("/");
    } else {
      console.log("Post not found");
      res.status(404).send("Post not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the post.");
  }
});

// Edit Post Route (GET)
router.get("/:postId/edit", isLoggedIn, async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });

    if (post && post.author.equals(req.user._id)) {
      res.render("edit", {
        post: post,
        currentUser: req.user,
      });
    } else {
      console.log("Post not found or unauthorized");
      res.status(404).send("Post not found or unauthorized.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching the post.");
  }
});

// Edit Post Route (POST)
router.post("/:postId/edit", isLoggedIn, async (req, res) => {
  const requestedPostId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: requestedPostId });

    if (post && post.author.equals(req.user._id)) {
      post.title = req.body.postTitle;
      post.content = req.body.postBody;
      post.save();
      res.redirect(`/posts/${requestedPostId}`);
    } else {
      console.log("Post not found or unauthorized");
      res.status(404).send("Post not found or unauthorized.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the post.");
  }
});

module.exports = router;
