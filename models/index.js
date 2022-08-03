const Blog = require('./blog');
const ReadingList = require('./readingList');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList });

Blog.findOptions = {
  attributes: { exclude: ['userId'] },
  include: {
    model: User,
    attributes: ['name'],
  },
};

User.findOptions = {
  include: {
    model: Blog,
    attributes: { exclude: ['userId'] },
  },
  attributes: {
    exclude: ['passwordHash'],
  },
};

module.exports = {
  Blog,
  User,
  ReadingList,
};
