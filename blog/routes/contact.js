const express = require("express");
const router = express.Router();

router.get("/contact", (req, res) => {
  res.render("contact", { contactCont: contactContent, currentUser: req.user });
});

module.exports = router;
