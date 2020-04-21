const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// middleware config

app.set("view engine", "ejs");
// user article router
app.use("/articles", articleRouter); //loc-its in articles.js file
// access all the different options in the form.. body parcer
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Post 1",
      createdAt: new Date(),
      description: "Test Description"
    },
    {
      title: "Post 2",
      createdAt: new Date(),
      description: "Test Description"
    }
  ];
  res.render("articles/index", {
    articles: articles
  });
});

app.listen(5000);
console.log("Server is listening on Port 5000");
