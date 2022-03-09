const Contact = require('@models/contact');
require('express-async-errors');

const info = async (req, res) => {
  const contacts = await Contact.find({});

  const html = `<p>Phonebook has info for ${
    contacts.length
  } people</p><p>${new Date()}</p>`;

  res.send(html);
};

const getAll = async (req, res) => {
  const contacts = await Contact.find({});

  return res.json(contacts.map((c) => c.toJSON()));
};

const getOne = async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
};

const create = async (req, res, next) => {
  const contact = new Contact(req.body);

  const newContact = await contact.save();
  res.status(201).json(newContact);
};

const deleteOne = async (req, res) => {
  await Contact.findByIdAndRemove(req.params.id);
  res.status(204).end();
};

const update = async (req, res) => {
  const body = req.body;

  const contact = {
    number: body.number,
  };

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    contact,
    {
      new: true,
    }
  );
  res.json(updatedContact);
};

module.exports = {
  info,
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
