const { Article, User } = require("../models");

async function showHome(req, res) {
  const articlesInstances = await Article.findAll();
  const articles = articlesInstances.map((article) => article.dataValues);
  const usersInstances = await User.findAll();
  const users = usersInstances.map((user) => user.dataValues);
  res.render("home", { articles, users });
}

module.exports = {
  showHome,
};
