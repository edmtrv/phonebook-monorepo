import React from 'react';

const Contact = ({ contact, onContactDelete }) => {
  return (
    <div className="contact">
      {contact.name} {contact.number}
      <button onClick={() => onContactDelete(contact.id, contact.name)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
