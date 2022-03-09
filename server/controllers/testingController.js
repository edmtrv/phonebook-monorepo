const Contact = require('@models/contact');

const reset = async (req, res) => {
  await Contact.deleteMany({});

  res.status(204).end();
};

module.exports = { reset };
