const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// new article
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// on form submit

router.post("/", (req, res) => {});

module.exports = router;
