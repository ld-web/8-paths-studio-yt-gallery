import { render, screen } from '@testing-library/react';

import App from './App';

test('App renders correctly', () => {
  render(<App />);

  const slider = screen.getByTestId('slider-container');
  expect(slider).toBeInTheDocument();

  const modal = screen.getByTestId('modal-container');
  expect(modal).toBeInTheDocument();
  expect(modal).toHaveStyle('opacity: 0');
  expect(modal).toHaveStyle('pointer-events: none');
});
