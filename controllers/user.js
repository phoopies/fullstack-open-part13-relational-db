const bcrypt = require('bcrypt');
const router = require('express').Router();
const tokenExtractor = require('../middleware/tokenExtractor');
const { User } = require('../models');

router.get('/', async (_req, res) => {
  const users = await User.findAll(User.findOptions);
  res.json(users);
});

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({ username, name, passwordHash });
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, User.findOptions);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', tokenExtractor, async (req, res) => {
  const { username } = req.params;
  const user = await User.findByPk(req.decodedToken.id, User.findOptions);
  if (user.username !== username) {
    return res.status(401).json({
      error: 'Can only edit own name',
    });
  }
  user.name = req.body.name;
  await user.save();
  return res.json(user);
});

module.exports = router;
