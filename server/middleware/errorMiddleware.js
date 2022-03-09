const errorHandler = (error, req, res, next) => {
  console.error(error.message, error.name);

  if (error.name === 'ApplicationError') {
    return res.status(500).send({ error: error.message });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  res.status(500).send({ error: error.message });
  return next(error);
};

module.exports = errorHandler;
