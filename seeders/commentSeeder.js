const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async (numOfUsers, numOfArticles, numOfComments) => {
  const comments = [];

  for (let i = 0; i < numOfComments; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      creationDate: faker.datatype.datetime(),
      updatedDate: faker.datatype.datetime(),
      userId: faker.datatype.number({
        min: 1,
        max: numOfUsers,
      }),
      articleId: faker.datatype.number({
        min: 1,
        max: numOfArticles,
      }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
