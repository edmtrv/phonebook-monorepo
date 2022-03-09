const Contact = require('@models/contact');

const initialContacts = [
  {
    name: 'emil',
    number: '123-888888',
  },
  {
    name: 'asd',
    number: '000-000000',
  },
];

const nonExistingId = async () => {
  const contact = new Contact({ name: 'toremove', number: '123-987654321' });
  await contact.save();
  await contact.remove();

  return contact._id.toString();
};

const contactsInDb = async () => {
  const contact = await Contact.find({});
  return contact.map((p) => p.toJSON());
};

module.exports = {
  initialContacts,
  nonExistingId,
  contactsInDb,
};
