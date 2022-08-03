/* eslint-disable camelcase */
const router = require('express').Router();
const { ReadingList } = require('../models');

router.post('/', async (req, res) => {
  const { blog_id, user_id } = req.body;
  const readingList = await ReadingList.create({
    blogId: blog_id,
    userId: user_id,
  });

  return res.status(200).send(readingList);
});

module.exports = router;
