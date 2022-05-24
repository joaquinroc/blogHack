const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync({ force: true });
  console.log("[Database] ¡Las tablas fueron creadas!");

  // Ejecutar seeders (datos de prueba):
  const numOfRoles = 4;
  const numOfUsers = 5;
  const numOfArticles = 10;
  const numOfComments = 20;

  await require("./seeders/roleSeeder")();

  await require("./seeders/userSeeder")(numOfRoles, numOfUsers);

  await require("./seeders/articleSeeder")(numOfUsers, numOfArticles);

  await require("./seeders/commentSeeder")(numOfUsers, numOfArticles, numOfComments);

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
