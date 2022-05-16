const { faker } = require("@faker-js/faker");
const { Article } = require("../models");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const instanceUsers = await User.findAll();
  const users = await instanceUsers.map((user) => user.dataValues);

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.lorem.sentence(1),
      content: faker.lorem.paragraphs(),
      image: faker.image.avatar(),
      UserId: faker.datatype.number({
        min: 1,
        max: users.length,
      }),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
