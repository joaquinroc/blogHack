require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");

const app = express();
const { User } = require("./models/index");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const bcrypt = require("bcryptjs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Le decimos a express que use el middleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET_WORD,
    resave: false,
    saveUninitialized: false,
  }),
);
// Como usamos sesiones, es necesario activar el siguiente middleware...
app.use(passport.session());

// Le especificamos a passport la estrategia a utilizar, en este caso NewLocalStrategy...
passport.use(
  new LocalStrategy({ usernameField: "userEmail", passwordField: "userPassword" }, async function (
    username,
    password,
    cb,
  ) {
    try {
      const user = await User.findOne({ where: { email: username } });
      if (!user) {
        console.log("User not found in DB");
        return cb(null, false);
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        console.log("Password incorrect");
        return cb(null, false);
      }
      if (compare) {
        console.log("Te damos la bienvenida " + user.name);
        return cb(null, user);
      }
    } catch (err) {
      cb(err, null);
    }
  }),
);

// Le espeficicamos a passport que es lo que deberia guardar en la session, en este caso el userId
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
// cb = callback
passport.deserializeUser(function (id, cb) {
  User.findByPk(id)
    .then((user) => {
      cb(null, user);
    })
    .catch((error) => {
      cb(error, null);
    });
});

// dbInitialSetup();

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", (req, res) => {
  bcrypt.hash(req.body.userPassword, 10, function (err, hash) {
    if (err) {
      console.log(err);
      return;
    }
    User.create({
      name: req.body.userFirstName,
      lastname: req.body.userLastName,
      email: req.body.userEmail,
      password: hash,
    });
  });
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  }),
);

routes(app);
app.listen(3000);
