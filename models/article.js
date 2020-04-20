const mongoose = require("mongoose");

// scheme for db

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// https://www.npmjs.com/package/mongoose
module.exports = mongoose.model("Article", articleSchema);
