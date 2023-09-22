const express = require("express");
const router = express.Router();

// Logout
router.get("/", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
