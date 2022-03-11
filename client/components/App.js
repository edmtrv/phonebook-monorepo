import React, { useState, useEffect } from 'react';
import Form from './Form';
import Contacts from './Contacts';
import Filter from './Filter';
import Notification from './Notification';
import phonebook from '../util/services/phonebook';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    phonebook.getAll().then((data) => setContacts(data));
  }, []);

  const onNameChange = (e) => setNewName(e.target.value);
  const onNumberChange = (e) => setNewNumber(e.target.value);
  const onTermChange = (e) => setNewTerm(e.target.value);

  const showNotification = (message, type = 'success') => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType('');
    }, 5000);
  };

  const addContact = () => {
    const newContact = { name: newName, number: newNumber };
    phonebook
      .create(newContact)
      .then((data) => {
        setContacts(contacts.concat(data));
        showNotification(`Added ${newName}`);
      })
      .catch((err) => {
        showNotification(err.response.data.error, 'error');
      });
  };

  const updateContact = () => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
    ) {
      const contact = contacts.find((p) => p.name === newName);
      const updatedContact = { ...contact, number: newNumber };

      phonebook
        .updateContact(contact.id, updatedContact)
        .then((data) => {
          setContacts(contacts.map((p) => (p.id !== contact.id ? p : data)));
          showNotification(`Updated phone for ${newName}`);
        })
        .catch(() => {
          showNotification(
            `Information of ${newName} has already been removed from server`,
            'error'
          );
        });
    }
  };

  const deleteContact = (id, name) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Delete ${name}?`)) {
      phonebook.deletePerson(id).then(() => {
        setContacts(contacts.filter((p) => p.id !== id));
      });
    }
  };

  const checkContactExists = (input) =>
    contacts.some((contact) => contact.name === input);

  const filterPhonebook = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(newTerm.toLowerCase())
    );

  const onNewData = () => {
    if (checkContactExists(newName)) {
      updateContact();
    } else {
      addContact();
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter onTermChange={onTermChange} term={newTerm} />
      <h3>Add New</h3>
      <Form
        onNewData={onNewData}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        name={newName}
        number={newNumber}
      />
      <Contacts contacts={filterPhonebook()} onContactDelete={deleteContact} />
    </div>
  );
};

export default App;
