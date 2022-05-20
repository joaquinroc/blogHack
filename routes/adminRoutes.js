const express = require("express");
const adminRouter = express.Router();

const articleController = require("../controllers/articleController");

adminRouter.get("/", articleController.getAllArticles);

adminRouter.get("/create", articleController.renderCreatePage);

adminRouter.post("/create", articleController.createArticle);

adminRouter.get("/edit/:id", articleController.showArticleToEdit);

adminRouter.post("/edit/:id", articleController.editArticle);

adminRouter.get("/delete/:id", articleController.deleteArticle);

module.exports = adminRouter;
