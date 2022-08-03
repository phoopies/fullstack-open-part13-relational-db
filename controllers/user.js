const bcrypt = require('bcrypt');
const router = require('express').Router();
const userExtractor = require('../middleware/userExtractor');
const { User, Blog } = require('../models');

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
  const where = {};
  if (req.query.read) {
    where.read = req.query.read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    ...User.findOptions,
    include: [
      ...[User.findOptions.include],
      {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
        through: {
          attributes: ['id', 'read'],
          as: 'readinglists',
          where,
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', userExtractor, async (req, res) => {
  const { username } = req.params;
  const { user } = req;
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
