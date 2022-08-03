const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

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
};
