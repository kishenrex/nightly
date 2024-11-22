import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from "../App";
import { MemoryRouter } from "react-router-dom";

import ChecklistPage from '../pages/Checklist';

test('Add night routine', () => {
  render(<MemoryRouter initialEntries={['/checklist']}>
    <App />
</MemoryRouter>);
  const addRoutineButton = screen.getByText("Add New Routine");
  expect(addRoutineButton).toBeInTheDocument();
});