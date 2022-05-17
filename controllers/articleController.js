const { Article, User } = require("../models");
const formidable = require("formidable");
const path = require("path");

const articleController = {
  getAllArticles: function (req, res) {
    res.render("home");
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

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err); 
      } 
      
      console.log(fields, files);

      res.json(fields, files);
    });
  },
  deleteArticle: function (req, res) {
    const deleteArticle = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
await jane.destroy();
  },
};

module.exports = articleController;
