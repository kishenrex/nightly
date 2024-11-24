import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from '../pages/Settings'; 

describe('Settings Is There', () => {
    test('shows the Settings page with all options', () => {
         render(<MemoryRouter initialEntries={['/settings']}>
            <App />
        </MemoryRouter>);

        expect(screen.getByText('Settings')).toBeInTheDocument();
        const desktopToggle = screen.getByLabelText(/Desktop Notification Preferences/i);
        expect(desktopToggle).toBeInTheDocument();

        const textToggle = screen.getByLabelText(/Text Notification Preferences/i);
        expect(textToggle).toBeInTheDocument();
        
        const themeToggle = screen.getByLabelText(/Auto-change Theme based on Time/i);
        expect(themeToggle).toBeInTheDocument();
        
        const gamificationToggle = screen.getByLabelText(/Toggle Gamification/i);
        expect(gamificationToggle).toBeInTheDocument();
    });

    test('Desktop Notis Work', () => {
         render(<MemoryRouter initialEntries={['/settings']}>
            <App />
        </MemoryRouter>);
        
        const desktopToggle = screen.getByLabelText(/Desktop Notification Preferences/i);
        fireEvent.click(desktopToggle);
        expect(desktopToggle).toBeChecked();
    });
});
