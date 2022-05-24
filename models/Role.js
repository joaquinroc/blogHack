module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      code: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "role",
    },
  );

  return Role;
};
