const { User, Article, Comment } = require("../models");
const formidable = require("formidable");
const path = require("path");

// Show the form for creating a new resource
async function create(req, res) {
  res.render("register");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: path.join(__dirname, "../public/img/avatar"),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      avatar: files.avatar.newFilename,
      email: fields.email,
      password: fields.password,
      roleId: 1,
    });
  });

  res.redirect("/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  if (req.user.role.code < 400) {
    return res.send("You are not allowed to edit this user!");
  }

  const user = await User.findByPk(req.params.id);
  res.render("userEdit", { user });
}

// Update the specified resource in storage.
async function update(req, res) {
  if (req.user.role.code < 400) {
    return res.send("You are not allowed to edit this user!");
  }

  const user = await User.findByPk(req.params.id);
  await user.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    avatar: req.body.avatar,
    email: req.body.email,
  });
  res.redirect("/dashboard");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  if (req.user.role.code < 400) {
    return res.send("You are not allowed to edit this user!");
  }

  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.redirect("/dashboard");
}

module.exports = {
  create,
  store,
  edit,
  update,
  destroy,
};
