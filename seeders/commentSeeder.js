const { faker } = require("@faker-js/faker");
const { Comment, Article, User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];
  const users = await User.findAll();
  const articles = await Article.findAll();

  for (let i = 0; i < 6; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      creationDate: faker.datatype.datetime(),
      updatedDate: faker.datatype.datetime(),
      userId: faker.datatype.number({
        min: 1,
        max: users.length,
      }),
      articleId: faker.datatype.number({
        min: 1,
        max: articles.length,
      }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
