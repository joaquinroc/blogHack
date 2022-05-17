const express = require("express");
const adminRouter = express.Router();

const articleController = require("../controllers/articleController");

adminRouter.get("/", articleController.getAllArticles);

adminRouter.get("/crear", articleController.showForm);

adminRouter.post("/crear", articleController.addUser);

module.exports = adminRouter;
