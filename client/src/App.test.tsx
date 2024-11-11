import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test('renders learn react link', () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  const loginButton = screen.getByText("Login");
   expect(loginButton).toBeInTheDocument();
});