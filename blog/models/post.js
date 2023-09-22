const mongoose = require("mongoose");

const postSchema = {
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

module.exports = mongoose.model("Post", postSchema);
