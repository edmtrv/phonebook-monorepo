import React from 'react';

const Filter = ({ onTermChange, term }) => {
  return (
    <div>
      Filter Phonebook:{' '}
      <input onChange={onTermChange} value={term} id="filter-field" />
    </div>
  );
};

export default Filter;
