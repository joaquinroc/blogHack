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

const Role = require("./Role")(sequelize, Model, DataTypes);
const User = require("./User")(sequelize, Model, DataTypes);
const Comment = require("./Comment")(sequelize, Model, DataTypes);
const Article = require("./Article")(sequelize, Model, DataTypes);

Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Article, { onDelete: "CASCADE" });
Article.belongsTo(User);

User.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(User);

Article.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Article);

module.exports = {
  sequelize,
  Role,
  User,
  Comment,
  Article,
};
