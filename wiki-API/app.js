const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check mongo connection
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

const articleSchema = {
    title: {
        type: String
    },
    content:{
        type: String
    }
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(async (req, res) => {
    try {
      const foundArticles = await Article.find();
      res.send(foundArticles);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }) 
  .post(async (req, res) => {
    try {
      console.log(req.body.title);
      console.log(req.body.content);

      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
      });
      newArticle
        .save()
        .then(() => {
          res.send("Successfully Added");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      Article.deleteMany()
        .then(() => {
          console.log("Deleted all articles");
          res.send("Deleted all articles");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(err);
    }
  });



let port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log("Server started successfully on " + port);
});
