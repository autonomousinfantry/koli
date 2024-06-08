import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from '../Notifications';

test('renders Notifications component', () => {
  render(<Notifications userId="12345" />);
  expect(screen.getByText('Notifications')).toBeInTheDocument();
});
