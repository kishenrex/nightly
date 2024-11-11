import { render, screen, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe('checks UI elements', () => {

test('checks if the background image gets rendered', async () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  const backgroundImage = await screen.findByRole('img');
  fireEvent.load( backgroundImage );

  // Check if the image is rendered
  expect(backgroundImage).toBeInTheDocument();
});

test('checks if the title gets rendered', () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  const title = screen.getByText("Nightly");
  expect(title).toBeInTheDocument();
});

test('checks if the login button gets rendered', () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  const loginButton = screen.getByRole('button');
  expect(loginButton).toBeInTheDocument();
});

});

test('checks if the login button gets rendered', async () => {
  render(<MemoryRouter>
    <App />
    </MemoryRouter>);
  expect(window.location.pathname).toBe('/');
  const loginButton = screen.getByRole('button');
  expect(loginButton).toBeInTheDocument();

  fireEvent.click(loginButton);
  expect(loginButton).not.toBeInTheDocument();
  //expect(window.location.pathname).toBe('/login'); 
});