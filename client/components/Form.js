import React from 'react';

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-field">Name</label>
        <input
          onChange={props.onNameChange}
          value={props.name}
          id="name-field"
        />
      </div>
      <div>
        <label htmlFor="number-field">Number</label>
        <input
          onChange={props.onNumberChange}
          value={props.number}
          id="number-field"
        />
      </div>
      <div>
        <button id="submit-button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
