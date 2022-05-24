const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async (numOfRoles, numOfUsers) => {
  const users = [];

  for (let i = 0; i < numOfUsers; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.lorem.sentence(1),
      roleId: faker.datatype.number({
        min: 1,
        max: numOfRoles,
      }),
      createdAt: faker.datatype.datetime({
        min: Date.parse(new Date(2000, 1, 1)),
        max: Date.parse(new Date()),
      }),
    });
  }

  // Define 4 users, one with each role for testing
  users.push(
    {
      firstname: "Reader",
      lastname: "Test User",
      avatar: faker.image.avatar(),
      email: "reader@email.com",
      password: "reader",
      roleId: 1,
    },
    {
      firstname: "Writer",
      lastname: "Test User",
      avatar: faker.image.avatar(),
      email: "writer@email.com",
      password: "writer",
      roleId: 2,
    },
    {
      firstname: "Editor",
      lastname: "Test User",
      avatar: faker.image.avatar(),
      email: "editor@email.com",
      password: "editor",
      roleId: 3,
    },
    {
      firstname: "Admin",
      lastname: "Test User",
      avatar: faker.image.avatar(),
      email: "admin@email.com",
      password: "admin",
      roleId: 4,
    },
  );

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
