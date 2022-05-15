module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
      },

      lastname: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
      },
    },

    {
      sequelize,
      moduleName: "User",
    },
  );

  return User;
};
