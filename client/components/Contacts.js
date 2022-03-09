import React from 'react';
import Contact from './Contact';

const Contacts = ({ contacts, onContactDelete }) => {
  return (
    <div className="contacts">
      <h3>Contacts</h3>
      {contacts.map((contact) => (
        <Contact
          key={contact.name}
          contact={contact}
          onContactDelete={onContactDelete}
        />
      ))}
    </div>
  );
};

export default Contacts;
