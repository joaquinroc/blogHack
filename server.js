require("dotenv").config();

const express = require("express");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

const authenticate = require("./middlewares/authenticate");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");

const methodOverride = require("method-override");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

authenticate(app);
routes(app);
dbInitialSetup();

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
