const { Article } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("home", { articles });
}

async function showArticle(req, res) {
  // const article = await Article.findByPk(req.params.id);
  res.render("post");
}

module.exports = {
  showHome,
  showArticle,
};
