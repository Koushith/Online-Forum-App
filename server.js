const express = require("express");
const mongoose = require("mongoose");
// model
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
// method ovrride
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndexes: true //errors thrown in the console
});

// middleware config

app.set("view engine", "ejs");

// access all the different options in the form.. body parcer
app.use(express.urlencoded({ extended: false }));

// override
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc"
  }); //this will get every single article
  res.render("articles/index", {
    articles: articles
  });
});
// user article router
app.use("/articles", articleRouter); //loc-its in articles.js file
app.listen(5000);
console.log("Server is listening on Port 5000");
