import { render, screen } from '@testing-library/react';

import Title from './Title';

test('Title is correcltly rendered', () => {
  render(<Title />);
  const div = screen.getByText('They trust me');
  expect(div).toBeInTheDocument();
  expect(div).toHaveStyle('text-align: center');
  expect(div).toHaveStyle('font-weight: 400');
  expect(div).toHaveStyle('color: rgb(199, 169, 0)');
});
