//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//mongodb connection with mongoose
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//check mongo connection
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected   to MongoDB successfully"));

//Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});


const User = new mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: username }).exec();

    if (!foundUser) {
      console.log("User not found");
      return res.send("User not found");
    }

    if (foundUser.password === password) {
      res.render("secrets");
    } else {
      console.log("Incorrect password");
      res.send("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
