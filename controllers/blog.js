const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog).end();
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(400).json({ error });
  }
});

const singleRouter = express.Router();

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
      return res.status(404);
    }
  } catch (e) {
    console.log(e);
    return res.status(400);
  }

  return next();
};

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