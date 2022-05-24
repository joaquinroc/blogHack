const express = require("express");
const passport = require("passport");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

publicRouter.use(makeUserAvailableInViews);

// GET home page
publicRouter.get("/", pagesController.showHome);

// GET article page
publicRouter.get("/article/:id", pagesController.showArticle);

// GET register page
publicRouter.get("/register", userController.create);

// POST register page
publicRouter.post("/register", userController.store);

// GET login page
publicRouter.get("/login", (req, res) => {
  res.render("login");
});

// POST login page
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

// GET logout
publicRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("logout");
  });
});

// POST comment
publicRouter.post("/comment", ensureAuthenticated, commentController.store);

module.exports = publicRouter;
