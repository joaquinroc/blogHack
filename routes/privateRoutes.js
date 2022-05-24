const express = require("express");
const privateRouter = express.Router();
const passport = require("passport");
const pagesController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const isWriter = require("../middlewares/isWriter");
const isEditor = require("../middlewares/isEditor");
const isAdmin = require("../middlewares/isAdmin");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

const privateCommonMiddlewares = [ensureAuthenticated, makeUserAvailableInViews];

// R E S O U R C E :  P A G E S

// GET dashboard
privateRouter.get("/dashboard", privateCommonMiddlewares, isWriter, pagesController.showDashboard);

// R E S O U R C E : A R T I C L E S

// GET create form
privateRouter.get("/article/create", privateCommonMiddlewares, isWriter, articleController.create);

// POST create form
privateRouter.post("/article", privateCommonMiddlewares, isWriter, articleController.store);

// GET edit form
privateRouter.get("/article/:id/edit", privateCommonMiddlewares, isWriter, articleController.edit);

// PATCH edit form
privateRouter.patch("/article/:id", privateCommonMiddlewares, isWriter, articleController.update);

// DETLETE article
privateRouter.delete("/article/:id", privateCommonMiddlewares, isWriter, articleController.destroy);

// R E S O U R C E :  C O M M E N T S

// GET edit form
privateRouter.get("/comment/:id/edit", privateCommonMiddlewares, isEditor, commentController.edit);

// PATCH comment:
privateRouter.patch("/comment/:id", privateCommonMiddlewares, isEditor, commentController.update);

// DELETE comment:
privateRouter.delete("/comment/:id", privateCommonMiddlewares, isEditor, commentController.destroy);

// // R E S O U R C E :  U S E R S

// GET user edit form
privateRouter.get("/user/:id/edit", privateCommonMiddlewares, isAdmin, userController.edit);

// PATCH user
privateRouter.patch("/user/:id", privateCommonMiddlewares, isAdmin, userController.update);

// DELETE user
privateRouter.delete("/user/:id", privateCommonMiddlewares, isAdmin, userController.destroy);

module.exports = privateRouter;
