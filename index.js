require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
// const db = require("./models/index");
const dbInitialSetup = require("./dbInitialSetup");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/adminRoute");
const apiRouter = require("./routes/api");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);
app.use(methodOverride("_method"));

dbInitialSetup();

app.listen(3000);
