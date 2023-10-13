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

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = {
    title: {
        type: String
    },
    content:{
        type: String
    }
};

const Article = mongoose.model("Article", articleSchema);


app.use(express.static("public"));


let port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log("Server started successfully on " + port);
});
