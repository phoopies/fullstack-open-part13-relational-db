const express = require('express');
const blogFinder = require('../middleware/blogFinder');
const tokenExtractor = require('../middleware/tokenExtractor');
const { User, Blog } = require('../models');

const router = express.Router();

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll(Blog.findOptions);
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  });
  res.json(blog);
});

const singleRouter = express.Router();

singleRouter.get('/', async (req, res) => {
  res.json(req.blog);
});

singleRouter.delete('/', async (req, res) => {
  await req.blog.destroy();
  res.status(200).end();
});

singleRouter.put('/', async (req, res) => {
  const { blog } = req;
  const likes = Number(req.body.likes);
  if (Number.isNaN(likes) || likes < 0) {
    return res.status(400).json({ error: 'Likes should be a valid number' });
  }
  blog.likes = likes;
  await blog.save();
  return res.json({ likes });
});

router.use('/:id', blogFinder, singleRouter);

module.exports = router;
