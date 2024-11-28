import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import '../styles/AvatarPageStyles.css';

describe('checks UI elements', () => {

test('checks if avatars get rendered', async () => {
  render(<MemoryRouter initialEntries={['/avatars']}>
    <App />
    </MemoryRouter>);
  const userAvatar = await waitFor(() => screen.findByRole('img',{name: 'userAvatar'}));
  fireEvent.load( userAvatar );
  expect(userAvatar.getAttribute('src')).toEqual(
  `pokemon_starters.jpeg`
  );

  const avatar1_3 = await waitFor(() => screen.findByRole('button',{name: 'avatar1_3'}));
  fireEvent.load( avatar1_3 );
  expect(avatar1_3.style.backgroundImage).toEqual(
  `url(raichu.png)`
  );

  const avatar1_2 = await waitFor(() => screen.findByRole('button',{name: 'avatar1_2'}));
  fireEvent.load( avatar1_2 );
  expect(avatar1_2.style.backgroundImage).toEqual(
  `url(pikachu.png)`
  );

  const avatar1_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar1_1'}));
  fireEvent.load( avatar1_1 );
  expect(avatar1_1.style.backgroundImage).toEqual(
  `url(pichu.png)`
  );

    const avatar2_3 = await waitFor(() => screen.findByRole('button',{name: 'avatar2_3'}));
  fireEvent.load( avatar1_3 );
  expect(avatar2_3.style.backgroundImage).toEqual(
  `url(blastoise.png)`
  );

  const avatar2_2 = await waitFor(() => screen.findByRole('button',{name: 'avatar2_2'}));
  fireEvent.load( avatar2_2 );
  expect(avatar2_2.style.backgroundImage).toEqual(
  `url(wartortle.png)`
  );

  const avatar2_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar2_1'}));
  fireEvent.load( avatar2_1 );
  expect(avatar2_1.style.backgroundImage).toEqual(
  `url(squirtle.png)`
  );

    const avatar3_3 = await waitFor(() => screen.findByRole('button',{name: 'avatar3_3'}));
  fireEvent.load( avatar3_3 );
  expect(avatar3_3.style.backgroundImage).toEqual(
  `url(charizard.png)`
  );

  const avatar3_2 = await waitFor(() => screen.findByRole('button',{name: 'avatar3_2'}));
  fireEvent.load( avatar3_2 );
  expect(avatar3_2.style.backgroundImage).toEqual(
  `url(charmeleon.png)`
  );

  const avatar3_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar3_1'}));
  fireEvent.load( avatar3_1 );
  expect(avatar3_1.style.backgroundImage).toEqual(
  `url(charmander.png)`
  );
});

test('checks if the title gets rendered', () => {
  render(<MemoryRouter initialEntries={['/avatars']}>
    <App />
    </MemoryRouter>);
  const title = screen.getByText("Avatars");
  expect(title).toBeInTheDocument();
});

test('checks user avatar gets changed', async () => {
  render(<MemoryRouter initialEntries={['/avatars']}>
    <App />
    </MemoryRouter>);
  const userAvatar = await waitFor(() => screen.findByRole('img',{name: 'userAvatar'}));
  fireEvent.load( userAvatar );
  expect(userAvatar.getAttribute('src')).toEqual(
  `pokemon_starters.jpeg`
  );

  const avatar1_3 = await waitFor(() => screen.findByRole('button',{name: 'avatar1_3'}));
  fireEvent.load( avatar1_3 );
  fireEvent.click( avatar1_3 );
  const lockedWarning = screen.getByText('Locked');
  expect(lockedWarning).toBeInTheDocument();
  expect(userAvatar.getAttribute('src')).toEqual(
  `pokemon_starters.jpeg`
  );

  const avatar1_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar1_1'}));
  fireEvent.load( avatar1_1 );
  fireEvent.click( avatar1_1 );
  expect(userAvatar.getAttribute('src')).toEqual(
  `pichu.png`
  );

  const avatar2_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar2_1'}));
  fireEvent.load( avatar2_1 );
  fireEvent.click( avatar2_1 );
  expect(userAvatar.getAttribute('src')).toEqual(
  `squirtle.png`
  );

  const avatar3_1 = await waitFor(() => screen.findByRole('button',{name: 'avatar3_1'}));
  fireEvent.load( avatar3_1 );
  fireEvent.click( avatar3_1 );
  expect(userAvatar.getAttribute('src')).toEqual(
  `charmander.png`
  );

});

});