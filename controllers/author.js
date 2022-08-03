const express = require('express');
const sequelize = require('sequelize');
// const { Op } = require('sequelize');
const { Blog } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const likes = [sequelize.fn('SUM', sequelize.col('likes'))];
  // id vs title. title if two blogs with same id are considered to be the same
  const blogs = [sequelize.fn('Count', sequelize.col('id'))];

  const authors = await Blog.findAll({
    attributes: ['author', [...likes, 'likes'], [...blogs, 'blogs']],
    group: 'author',
    order: [
      [...likes, 'DESC'],
      [...blogs, 'DESC'],
    ],
  });
  res.json(authors);
});

module.exports = router;
