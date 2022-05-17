const { faker } = require("@faker-js/faker");
const { Article, User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = await User.findAll();

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.lorem.sentence(1),
      content: faker.lorem.paragraphs(),
      image: faker.image.cats(),
      creationDate: faker.datatype.datetime(),
      updatedDate: faker.datatype.datetime(),
      userId: faker.datatype.number({
        min: 1,
        max: users.length,
      }),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
