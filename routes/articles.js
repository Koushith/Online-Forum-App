const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// new article :- everytime when we save, if its not new it will go here
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// edit route

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

// if no errer in sending this route will be called
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug }); // The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
}); //show page

// on form submit (SAVE)

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// update and save
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// delete btn
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// update,edit and save are identical

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
