const apiRoutes = require("./apiRoutes");
const privateRoutes = require("./privateRoutes");
const publicRoutes = require("./publicRoutes");

module.exports = (app) => {
  app.use(apiRoutes);
  app.use(privateRoutes);
  app.use(publicRoutes);
};
