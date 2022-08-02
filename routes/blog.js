const router = require('express').Router();
const Blog = require('../db/models/blog');

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      res.json(blog).end();
    }
  } catch (e) {
    console.log(`error: ${e}`);
  }
  res.status(404).end();
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog).end();
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
  } catch (e) {
    console.log(`error: ${e}`);
  }

  res.status(200).end();
});

module.exports = router;
