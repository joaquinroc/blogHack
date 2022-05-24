const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async (numOfUsers, numOfArticles) => {
  const articles = [];

  for (let i = 0; i < numOfArticles; i++) {
    articles.push({
      title: faker.lorem.sentence(3),
      content: faker.lorem.paragraphs(),
      image: faker.image.cats(),
      userId: faker.datatype.number({
        min: 1,
        max: numOfUsers,
      }),
      createdAt: faker.datatype.datetime({
        min: Date.parse(new Date(2000, 1, 1)),
        max: Date.parse(new Date()),
      }),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
