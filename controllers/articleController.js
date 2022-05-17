const { Article, User } = require("../models");
const formidable = require("formidable");
const path = require("path");
const { log } = require("console");

const articleController = {
  getAllArticles: function (req, res) {
    console.log("Hola");
    res.render("adminShowall");
  },
  getOneArticle: function (req, res) {
    res.render("article");
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
};

module.exports = articleController;
