const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

const Article = require("./Article")(sequelize, Model, DataTypes);
const User = require("./User")(sequelize, Model, DataTypes);
const Comment = require("./Comment")(sequelize, Model, DataTypes);

Article.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Article, { foreignKey: "userId" });

Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

Comment.belongsTo(Article, { foreignKey: "articleId" });
Article.hasMany(Comment, { foreignKey: "articleId" });

module.exports = { sequelize, Article, User, Comment };
