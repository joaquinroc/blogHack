const express = require("express");
const indexRouter = express.Router();
const articleController = require("../controllers/articleController");
const pagesController = require("../controllers/pagesController");

// GET HOME PAGE
indexRouter.get("/", pagesController.showHome);

// GET ONE ARTICLE
// indexRouter.get("/:id", articleController.getOneArticle);

module.exports = indexRouter;
