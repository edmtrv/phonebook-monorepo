import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  );
};

export default Notification;
