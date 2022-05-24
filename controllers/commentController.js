const { User, Article, Comment } = require("../models");

// Store a newly created resource in storage.
async function store(req, res) {
  Comment.create({
    content: req.body.comment,
    creationDate: Date.now(),
    articleId: req.body.articleId,
    userId: req.user.id,
  });

  res.redirect(`/article/${req.body.articleId}`);
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  comment = await Comment.findByPk(req.params.id, {
    include: [{ model: User }, { model: Article }],
  });

  res.render("commentEdit", comment);
}

// Update the specified resource in storage.
async function update(req, res) {
  if (req.user.role.code < 300) {
    return res.send("You are not allowed to edit a comment!");
  }

  const comment = await Comment.findByPk(req.params.id);
  if (comment) {
    comment.update({
      content: req.body.content,
      updatedAt: Date.now(),
    });
  }

  res.redirect(`/article/${comment.articleId}`);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  if (req.user.role.code < 300) {
    return res.send("You are not allowed to delete a comment!");
  }

  const comment = await Comment.findByPk(req.params.id);
  const articleId = comment.articleId;
  if (comment) {
    comment.destroy();
  }

  res.redirect(`/article/${articleId}`);
}

module.exports = {
  store,
  edit,
  update,
  destroy,
};
