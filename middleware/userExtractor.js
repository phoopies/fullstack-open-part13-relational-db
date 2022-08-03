const { User } = require('../models');
const tokenExtractor = require('./tokenExtractor');

const userExtractor = (req, res, next) => (
  tokenExtractor(req, res, async () => {
    if (!req.decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findByPk(req.decodedToken.id, User.findOptions);
    req.user = user;
    return next();
  })
);

module.exports = userExtractor;
