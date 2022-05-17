module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      content: {
        type: DataTypes.STRING(1000),
      },

      creationDate: {
        type: DataTypes.DATE,
      },

      updateDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      moduleName: "comment",
      timestamps: false,
    },
  );

  return Comment;
};
