const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "ejercicio21",
  "root",
  "root",
  //  process.env.DB_DATABASE,
  //process.env.DB_USERNAME,
  //  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Article = require("./Article")(sequelize, Model, DataTypes);
const User = require("./User")(sequelize, Model, DataTypes);

Article.belongsTo(User);
User.hasMany(Article);

sequelize.sync({ alter: true });

module.exports = { sequelize, Article };
