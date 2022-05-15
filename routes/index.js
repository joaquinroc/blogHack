const express = require("express");
const indexRouter = express.Router();
const articleController = require("../controllers/articleController");

// GET HOME PAGE
indexRouter.get("/", articleController.getAllArticles);

// GET ONE ARTICLE
indexRouter.get("/:id", articleController.getOneArticle);

module.exports = indexRouter;
