const { Article, User } = require("../models");
const formidable = require("formidable");
const path = require("path");

const articleController = {
  getAllArticles: async function (req, res) {
    const articles = await Article.findAll();
    if (req.isAuthenticated()) {
      res.render("adminShowall", { articles });
    } else {
      res.redirect("/login");
    }
  },

  showForm: function (req, res) {
    res.render("createArticle");
  },
  addUser: function (req, res, next) {
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
        title: fields.tittle,
        content: fields.content,
        image: files.img.newFilename,
      });
    });
  },
  showArticleToEdit: async function (req, res) {
    const article = await Article.findByPk(req.params.id);
    res.render("edit", { article });
  },
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
    res.redirect("/admin/edit");
  },
};

module.exports = articleController;
