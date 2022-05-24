const { User, Article, Comment } = require("../models");

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

async function showDashboard(req, res) {
  const articles = await Article.findAll({ include: User });

  if (req.user.role.code >= 400) {
    const users = await User.findAll();
    return res.render("dashboard", { articles, users });
  }

  res.render("dashboard", { articles });
}

module.exports = {
  showHome,
  showArticle,
  showDashboard,
};
