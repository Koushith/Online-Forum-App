// this route contains all the article relates stuff

const express = require("express");
// imports model
const Article = require("../models/article");
// const Article = require("../models/article");
const router = express.Router();

// route for new articles
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

// on form submit this function will be called
router.post("/", async (req, res) => {
  let article = new Article({
    // we are using the form fields, also from model
    title: req.body.title,
    description: req.body.description,
    markedown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render("/articles/new", { article: article });
  }
});

module.exports = router;
