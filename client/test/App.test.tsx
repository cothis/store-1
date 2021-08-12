import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('render App', () => {
  render(<App />);
  const linkElement = screen.getByText(/배민문방구/i);
  expect(linkElement).toBeInTheDocument();
});
