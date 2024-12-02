import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

describe('checks toggle theme', () => {

test('checks if landing page image changes', async () => {
  render(<MemoryRouter>
    <LandingPage/>
    </MemoryRouter>);
  const toggleThemeButton = await waitFor(() => screen.findByRole('button',{name: 'toggleTheme'}));
  const backgroundImage = await waitFor(() => screen.findByRole('img',{name: 'backgroundImage'}));
  expect(backgroundImage.getAttribute('src')).toEqual(
  `DarkThemeLandingPage.jpg`
  );
  fireEvent.click(toggleThemeButton);
  expect(backgroundImage.getAttribute('src')).toEqual(
  `LightThemeLandingPage.jpeg`
  );

});





});