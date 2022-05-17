const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");

publicRouter.get("/", pagesController.showHome);

publicRouter.get("/:id", pagesController.showArticle);

module.exports = publicRouter;
