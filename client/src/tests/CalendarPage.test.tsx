import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ChecklistPage from '../pages/Checklist';

test('Add night routine', () => {
  render(<ChecklistPage />);
  const addRoutineButton = screen.getByText("Add New Routine");
  expect(addRoutineButton).toBeInTheDocument();
});