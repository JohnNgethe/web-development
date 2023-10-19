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
db.once("open", () => console.log("Connected to MongoDB successfully"));

const articleSchema = {
    title: {
        type: String
    },
    content:{
        type: String
    }
};

const Article = mongoose.model("Article", articleSchema);

// Request for all articles

app.route("/articles")
  //viewing all posts
  .get(async (req, res) => {
    try {
      const foundArticles = await Article.find();
      res.send(foundArticles);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }) 

  //creating new posts
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

////requests for specific section///

  app
    .route("/articles/:articleTitle")

    .get(async (req, res) => {
      const reqTitle = req.params.articleTitle;
      try {
        const foundTitle = await Article.findOne({ title: reqTitle });

        if (foundTitle) {
          res.send(foundTitle);
        } else {
          res.send("Title not found");
        }
      } catch (err) {
        console.log(err);
      }
    })

    // Replace the entire document with a new one
    .put(async (req, res) => {
      try {
        const filter = { title: req.params.articleTitle };
        const update = {
          title: req.body.title,
          content: req.body.content !== undefined ? req.body.content : null, // Set content to null if not provided
        };

        const result = await Article.findOneAndUpdate(filter, update,  { new: true });

        if (!result) {
          res.status(404).send("Article not found");
        } else {
          res.send("Article replaced successfully");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating article");
      }
    })
 
    // Update specific fields of a document
    .patch(async (req, res) => {
      try {
        const filter = { title: req.params.articleTitle };
        const update = { $set: req.body };

        const result = await Article.findOneAndUpdate(filter, update);

        if (!result) {
          res.status(404).send("Article not found");
        } else {
          res.send("Article updated successfully");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating article");
      }
    })

    //deleting specific article
    .delete(async (req, res)=>{
      try {

        // Article.deleteOne({ title: req.params.articleTitle })
        // .then(()=>{
        //   res.send("Article deleted successfully");
        // }).
        // catch((err)=>{
        //   console.log(err);
        //});
        const filter = {title: req.params.articleTitle};

        const result = await Article.findOneAndDelete(filter);

        if (!result) {
          res.status(404).send("Article not found");
        } else {
          res.send("Article deleted successfully");
        }
        
      } catch (error) {
        console.error(error);
      }
    });


let port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`Server started successfully on port ${port}`);
});

