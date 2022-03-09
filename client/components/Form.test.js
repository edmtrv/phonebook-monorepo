import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('when a Form component is loaded', () => {
  test('form displays correctly', () => {
    render(<Form />);
    const name = screen.getByLabelText(/name/i);
    const number = screen.getByLabelText(/number/i);

    expect(name).toBeDefined();
    expect(number).toBeDefined();
  });

  test('form can be submitted successfully', () => {
    const handleNewData = jest.fn();
    render(<Form onNewData={handleNewData} />);

    const name = 'emil';
    const number = '123-999999';

    userEvent.type(screen.getByLabelText(/name/i), name);
    userEvent.type(screen.getByLabelText(/number/i), number);
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    screen.debug();
    expect(handleNewData).toHaveBeenCalledTimes(1);
  });
});
