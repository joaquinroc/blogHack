require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models/index");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("index", { data: db.Article });
});

app.listen(3000);
