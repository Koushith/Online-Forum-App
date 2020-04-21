const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// new article :- everytime when we save, if its not new it will go here
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// if no errer in sending this route will be called
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id); // The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
}); //show page

// on form submit (SAVE)

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render("articles/new", { article: article }); //sec paramenter- returns the page with prefille form
  }
});

module.exports = router;
