const errorHandler = (error, _req, res, next) => {
  console.log(`Error msg: ${error.message}`);
  console.log(`Error name: ${error.name}`);

  switch (error.name) {
    case 'ReferenceError':
      return res.status(404).send({ error: 'Requested object not found' });
    case 'SequelizeDatabaseError':
      return res.status(400).send({ error: 'Something went wrong' });
    case 'SequelizeValidationError':
      return res.status(400).send({ error: 'Malformed object' });
    default:
      return next(error);
  }
};

module.exports = errorHandler;
