const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { Role, User } = require("../models");

module.exports = (app) => {
  app.use(
    session({
      secret: "aguanteElEquipo11",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        console.log("Dentro de local strategy");
        try {
          const user = await User.findOne({ where: { email: username } });
          if (!user) {
            console.log("error mail");
            return done(null, false, { message: "Incorrect email or password." });
          }
          if (!(await bcrypt.compare(password, user.password))) {
            console.log("error contra");
            return done(null, false, { message: "Incorrect email or password." });
          }
          return done(null, user);
        } catch (err) {
          console.log("Dentro del catch");
          return done(err);
        }
      },
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id, { include: Role })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, user);
      });
  });
};
