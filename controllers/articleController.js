const { User, Article } = require("../models");
const formidable = require("formidable");
const path = require("path");

// Show the form for creating a new resource
async function create(req, res) {
  res.render("create");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: path.join(__dirname, "../public/img/articles"),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      userId: fields.userId,
    });
  });
  res.redirect("/dashboard");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: { model: User },
  });

  if (req.user.role.code < 300 && article.user.id !== req.params.id) {
    return res.send("You are not allowed to edit somebody else's Article!");
  }

  if (!article) {
    return res.send("You can't edit an unexisting article!");
  }

  res.render("edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: { model: User },
  });

  if (req.user.role.code < 300 && article.user.id !== req.params.id) {
    return res.send("You are not allowed to edit somebody else's Article!");
  }

  if (article) {
    await article.update({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      updatedAt: Date.now(),
    });
  }

  res.redirect("/dashboard");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: { model: User },
  });

  if (req.user.role.code < 300 && article.user.id !== req.params.id) {
    return res.send("You are not allowed to delete somebody else's Article!");
  }

  if (article) {
    await article.destroy();
  }

  res.redirect("/dashboard");
}

module.exports = {
  create,
  store,
  edit,
  update,
  destroy,
};
