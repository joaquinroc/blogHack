const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");
const { User } = require("../models");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];

  const instanceUsers = await User.findAll();
  const users = await instanceUsers.map((user) => user.dataValues);

  const instanceArticles = await Article.findAll();
  const articles = await instanceArticles.map((article) => article.dataValues); // true

  for (let i = 0; i < 6; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),

      UserId: faker.datatype.number({
        min: 1,
        max: users.length,
      }),

      ArticleId: faker.datatype.number({
        min: 1,
        max: articles.length,
      }),
    });

    await Comment.bulkCreate(comments);
    console.log("[Database] Se corrió el seeder de Articles.");
  }
};
