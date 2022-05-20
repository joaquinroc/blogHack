const { Comment } = require("../models");

async function store(req, res) {
  Comment.create({
    content: req.body.comment,
    creationDate: Date.now(),
    articleId: req.params.id,
    userId: Math.floor(Math.random() * 5 + 1),
  });
  // Comentario con usuario random asosciado, tome como que hay 5 por ejemplo

  res.redirect(`/article/${req.params.id}`);
}

module.exports = {
  store,
};
