const express = require("express");
const adminRouter = express.Router();
const formidable = require("formidable");
const articleController = require("../controllers/articleController");

adminRouter.get("/crear", articleController.showForm);

adminRouter.post("/crear", articleController.addUser);

adminRouter.get("/:id", articleController.deleteArticle);

adminRouter;

module.exports = adminRouter;
