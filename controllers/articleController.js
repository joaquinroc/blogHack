const { Article, User } = require("../models");
const formidable = require("formidable");
const path = require("path");

const articleController = {
  // Funcion que carga todos los artículos y los muestra en la pagina de /admin
  getAllArticles: async function (req, res) {
    const articles = await Article.findAll({
      include: {
        model: User,
      },
    });
    if (req.isAuthenticated()) {
      res.render("adminShowall", { articles });
    } else {
      res.redirect("/login");
    }
  },
  // Funcion que carga el formulario para crear un articulo
  renderCreatePage: function (req, res) {
    if (req.isAuthenticated()) {
      res.render("create", { userId: req.user.id });
    } else {
      res.redirect("/login");
    }
  },

  // Funcion que crea un articulo y me redirige a /admin
  createArticle: function (req, res, next) {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
      uploadDir: path.join(__dirname, "../public/img"),
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const articles = await Article.create({
        title: fields.title,
        content: fields.content,
        image: files.image.newFilename,
        userId: fields.userId,
      });
    });
    res.redirect("/admin");
  },

  // Funcion que muestra el articulo a editar...
  showArticleToEdit: async function (req, res) {
    const article = await Article.findByPk(req.params.id);
    if (req.user.id === article.userId) {
      res.render("edit", { article });
    } else {
      res.redirect("/admin");
    }

    // res.render("edit", { article });
  },

  // Funcion que edita el article  y nos redirecciona a /admin
  editArticle: async function (req, res) {
    const updateArticle = await Article.update(
      {
        title: req.body.articleTitle,
        content: req.body.articleContent,
        image: req.body.articleImage,
        updateDate: Date.now(),
      },
      { where: { id: req.params.id } },
    );
    console.log(`Succesfully updated article id ${req.params.id}`);
    res.redirect("/admin");
  },

  deleteArticle: async function destroy(req, res) {
    const article = await Article.findByPk(req.params.id);
    if (req.user.id === article.userId) {
      const deleteArticle = await Article.destroy({ where: { id: req.params.id } });
      console.log(`Succesfully deleted article with ID: ${req.params.id}`);
      res.redirect("/admin");
    } else {
      console.log("This article doesn't belong to you");
      res.redirect("/admin");
    }
  },
};

module.exports = articleController;
