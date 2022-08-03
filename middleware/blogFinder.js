const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, Blog.findOptions);
  if (!req.blog) {
    return res.status(404);
  }
  return next();
};

module.exports = blogFinder;
