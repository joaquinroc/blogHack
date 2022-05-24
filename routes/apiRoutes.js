const express = require("express");
const apiRouter = express.Router();

const apiArticleController = require("../controllers/api/apiArticleController");

// R E S O U R C E : A R T I C L E S

// GET list of articles
apiRouter.get("/articles", (req, res) => {
  console.log("api articlessss");
});

module.exports = apiRouter;
