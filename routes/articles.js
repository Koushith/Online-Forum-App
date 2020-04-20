// this route contains all the article relates stuff

const express = require("express");
const router = express.Router();

// route for new articles
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// on form submit this function will be called
router.post("/", (req, res) => {});

module.exports = router;
