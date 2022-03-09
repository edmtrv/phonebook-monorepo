const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('@root/server/index');
const Contact = require('@models/contact');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Contact.deleteMany({});

  const contactObjects = helper.initialContacts.map((p) => new Contact(p));
  const promiseArray = contactObjects.map((c) => c.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some contacts saved', () => {
  test('contacts are returned as json', async () => {
    await api
      .get('/contacts')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all contacts are returned', async () => {
    const response = await api.get('/contacts');

    expect(response.body).toHaveLength(helper.initialContacts.length);
  });

  test('a specific contact is within the required contacts', async () => {
    const response = await api.get('/contacts');

    const names = response.body.map((p) => p.name);
    expect(names).toContain('emil');
  });
});

describe('viewing a specific contact', () => {
  test('succeeds with a valid id', async () => {
    const contactsAtStart = await helper.contactsInDb();

    const contactToView = contactsAtStart[0];

    const resultContact = await api
      .get(`/contacts/${contactToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultContact.body).toEqual(contactToView);
  });

  test('fails with statuscode 404 if it does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();

    await api.get(`/contacts/${validNonExistingId}`).expect(404);
  });

  test('fails with statuscode 500 if id is invalid', async () => {
    const invalidId = 'asdad';

    await api.get(`/contacts/${invalidId}`).expect(500);
  });
});

describe('addition of a new contact', () => {
  test('succeeds with valid data', async () => {
    const newContact = {
      name: 'new contact',
      number: '123-985314',
    };

    await api
      .post('/contacts')
      .send(newContact)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const contactsAtEnd = await helper.contactsInDb();

    const names = contactsAtEnd.map((p) => p.name);

    expect(contactsAtEnd).toHaveLength(helper.initialContacts.length + 1);
    expect(names).toContain('new contact');
  });

  test('fails with status code 400 if data is invalid', async () => {
    const newContact = {
      number: '123-12313123',
    };

    await api.post('/contacts').send(newContact).expect(400);

    const contactsAtEnd = await helper.contactsInDb();

    expect(contactsAtEnd).toHaveLength(helper.initialContacts.length);
  });
});

describe('deletion of a contact', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const contactsAtStart = await helper.contactsInDb();
    const contactToDelete = contactsAtStart[0];

    await api.delete(`/contacts/${contactToDelete.id}`).expect(204);

    const contactsAtEnd = await helper.contactsInDb();

    expect(contactsAtEnd).toHaveLength(helper.initialContacts.length - 1);

    const names = contactsAtEnd.map((c) => c.name);

    expect(names).not.toContain(contactToDelete.name);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
