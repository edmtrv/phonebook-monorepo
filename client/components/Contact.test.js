import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

test('renders a contact', () => {
  const contact = {
    name: 'emil',
    number: '123-999999',
  };

  render(<Contact contact={contact} />);

  const element = screen.getByText(/emil/i);
  expect(element).toHaveTextContent(`${contact.name} ${contact.number}`);
});
