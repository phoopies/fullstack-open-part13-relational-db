const Blog = require('../models/blog');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404);
  }
  return next();
};

module.exports = blogFinder;
