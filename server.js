const express = require("express");

// hookup database
const mongoose = require("mongoose");
// import article route
const articleRouter = require("./routes/articles");

const app = express();

// setup View Engine, we can use any- such as hbs
app.set("view engine", "ejs");

// use Article Router
app.use("/articles", articleRouter);

// setup local server
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article 1",
      createdAt: new Date(),
      description: "Test Description"
    },
    {
      title: "Test Article 2 ",
      createdAt: new Date(),
      description: "Test Description"
    }
  ];
  //   render pages
  res.render("articles/index", {
    articles: articles
  });
});
app.listen(5000);
console.log("server has started on port 5000");
