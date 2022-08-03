const jwt = require('jsonwebtoken');
const { Session, User } = require('../models');
const { SECRET } = require('../util/config');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const session = await Session.findByPk(token);
    if (session) {
      const user = await User.findByPk(session.userId);
      if (user.disabled) {
        return res
          .status(401)
          .json({ error: 'account disabled, please contact admin' });
      }
      req.decodedToken = jwt.verify(token, SECRET);
      req.token = token;
    } else {
      return res.status(401).json({ error: 'Session has expired' });
    }
  } else {
    return res.status(401).json({ error: 'Token missing' });
  }
  return next();
};

module.exports = tokenExtractor;
