const express = require('express');
const { Op } = require('sequelize');
const blogFinder = require('../middleware/blogFinder');
const userExtractor = require('../middleware/userExtractor');
const { Blog } = require('../models');
const { userOwnsBlog } = require('../util/misc');

const router = express.Router();

router.get('/', async (req, res) => {
  let where = { };
  if (req.query.search) {
    const filter = { [Op.iLike]: `%${req.query.search}%` };
    where = {
      [Op.or]: [{ title: filter }, { author: filter }],
    };
  }

  const order = [['likes', 'DESC']];

  const blogs = await Blog.findAll({ ...Blog.findOptions, where, order });
  res.json(blogs);
});

router.post('/', userExtractor, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(blog);
});

const singleRouter = express.Router();

singleRouter.get('/', async (req, res) => {
  res.json(req.blog);
});

singleRouter.delete('/', userExtractor, async (req, res) => {
  if (userOwnsBlog(req.user, req.blog)) {
    await req.blog.destroy();
    return res.status(200).end();
  }
  return res.status(401).send({ error: 'Not the owner of the blog' }).end();
});

singleRouter.put('/', async (req, res) => {
  const { blog } = req;
  const likes = Number(req.body.likes);
  blog.likes = likes;
  await blog.save();
  return res.json({ likes });
});

router.use('/:id', blogFinder, singleRouter);

module.exports = router;
