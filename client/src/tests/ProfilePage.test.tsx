import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";

describe('ProfilePage UI elements (initial render)', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    container = rendered.container;
  });

  test('renders the profile title', () => {
    const title = screen.getByText('Profile');
    expect(title).toBeInTheDocument();
  });

  test('renders the home button', () => {
    const homeIcon = container.querySelector('.bi-house-fill');
    expect(homeIcon).toBeInTheDocument();
  });

  test('renders all profile fields', () => {
    const username = screen.getByText('Username:');
    const password = screen.getByText('Password:');
    const email = screen.getByText('Email:');

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    // check initial values
    expect(screen.getByText('JohnMachine222')).toBeInTheDocument();
    expect(screen.getByText('••••••••••••••')).toBeInTheDocument();
    expect(screen.getByText('johnnyappleseed@nightly.com')).toBeInTheDocument();
  });

  test('renders the avatar section', () => {
    const avatarTitle = screen.getByText('AVATAR');
    const avatarIcon = container.querySelector('.bi-person-fill');
    // second pencil icon is for avatar
    const editAvatarButton = container.querySelectorAll('.bi-pencil')[1];

    expect(avatarTitle).toBeInTheDocument();
    expect(avatarIcon).toBeInTheDocument();
    expect(editAvatarButton).toBeInTheDocument();
  });

  test('renders edit buttons for each field', () => {
    const editButtons = screen.getAllByText('Edit');
    // one for each field
    expect(editButtons).toHaveLength(3);
  });
});

describe('ProfilePage interactions', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    container = rendered.container;
  });

  test('toggle password visibility works', () => {
    const toggleButton = container.querySelector('.bi-eye')?.parentElement;
    expect(toggleButton).toBeInTheDocument();
  
    const maskedPassword = screen.getByText('••••••••••••••');
    expect(maskedPassword).toBeInTheDocument();
  
    if (toggleButton) {
      fireEvent.click(toggleButton);
      const unmaskedPassword = screen.getByText('mySecurePassword123');
      expect(unmaskedPassword).toBeInTheDocument();
    
      fireEvent.click(toggleButton);
      const remaskedPassword = screen.getByText('••••••••••••••');
      expect(remaskedPassword).toBeInTheDocument();
    }
  });

  test('edit modal opens and closes correctly', async () => {
    const editButtons = screen.getAllByText('Edit');
    
    fireEvent.click(editButtons[0]);
    
    const modalTitle = screen.getByText('Edit Username');
    expect(modalTitle).toBeInTheDocument();
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('JohnMachine222');
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('editing a field updates the value', () => {
    const editButtons = screen.getAllByText('Edit');
    
    // open modal for email
    fireEvent.click(editButtons[2]);
    
    // edit the email
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'newemail@test.com' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(screen.getByText('newemail@test.com')).toBeInTheDocument();
  });

  test('empty values are not saved', () => {
    const editButtons = screen.getAllByText('Edit');
    const originalEmail = 'johnnyappleseed@nightly.com';
    
    // open modal for email
    fireEvent.click(editButtons[2]);
    
    // try to save empty value
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(screen.getByText(originalEmail)).toBeInTheDocument();
  });
});
