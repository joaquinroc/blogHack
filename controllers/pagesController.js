const { Article, User, Comment } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("home", { articles });
}

async function showArticle(req, res) {
  const article = await Article.findByPk(req.params.id, { include: User });
  const comments = await Comment.findAll({
    include: User,
    where: {
      articleId: req.params.id,
    },
  });
  res.render("article", { article, comments });
}

module.exports = {
  showHome,
  showArticle,
};
