const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const commentController = require("../controllers/commentController");

publicRouter.get("/", pagesController.showHome);

publicRouter.get("/:id", pagesController.showArticle);

publicRouter.post("/:id", commentController.store);

module.exports = publicRouter;
