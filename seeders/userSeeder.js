const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.name.firstName(),
      lastname: faker.name.firstName(),
      email: faker.internet.email(),
      creationDate: faker.datatype.datetime(),
      updatedDate: faker.datatype.datetime(),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
