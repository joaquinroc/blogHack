module.exports = (sequelize, Models, DataTypes) => {
  class Article extends Models {}

  Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
      },

      content: {
        type: DataTypes.TEXT,
      },

      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      moduleName: "article",
    },
  );

  return Article;
};
