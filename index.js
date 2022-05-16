require("dotenv").config();
const express = require("express");
const app = express();
// const db = require("./models/index");
const dbInitialSetup = require("./dbInitialSetup");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

app.set("view engine", "ejs");

app.use(express.static("public"));

dbInitialSetup();

app.listen(3000);
