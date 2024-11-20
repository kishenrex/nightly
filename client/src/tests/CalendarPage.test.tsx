import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Add night routine', () => {
  render(<MemoryRouter initialEntries={['/calendar']}>
    <App />
    </MemoryRouter>);
  const addRoutineButton = screen.getByText("Add New Routine");
  expect(addRoutineButton).toBeInTheDocument();
});