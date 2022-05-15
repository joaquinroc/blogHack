const { Article, User } = require("../models");

const articleController = {
  getAllArticles: function (req, res) {
    res.render("home");
  },
  getOneArticle: function (req, res) {
    res.render("article");
  },
};

module.exports = articleController;
