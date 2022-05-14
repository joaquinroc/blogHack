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

      image: {
        type: DataTypes.STRING,
      },
      autorId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      moduleName: "Article",
      timestamps: false,
    }
  );

  return Article;
};
