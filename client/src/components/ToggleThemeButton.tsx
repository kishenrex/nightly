import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from '../context/ThemeContext';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
const API_BASE_URL = 'http://localhost:3001';
function ToggleThemeButton(): JSX.Element {
    const { theme, setTheme } = useContext(ThemeContext);
    let { user, setUser} = useContext(UserContext);

  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const toggleTheme = async () => {
    setError(null); // Reset error state
    setDisabled(true); // Disable the button while processing

    // Determine the new theme
    if (theme.boolean){
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
    //const newTheme = theme.boolean ? themes.light : themes.dark;
    console.log(theme);
    console.log(user);
    try {
      // Make PATCH request to update theme on the backend
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: theme.boolean ? 'dark' : 'light',
        }),
      });
              console.log(theme);
      if (!response.ok) {
        throw new Error('Failed to update user theme');
      }

      // Update theme in context
      //setTheme(newTheme);
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update theme. Please try again.');
    } finally {
      setDisabled(false); // Re-enable the button
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <Button
        style={{
          color: theme.fontColor,
          borderColor: theme.borderColor,
          height: theme.themeButtonSize,
          width: theme.themeButtonSize,
          fontSize: theme.themeButtonFontSize,
        }}
        className="toggleButton"
        role="button"
        aria-label="toggleTheme"
        onClick={toggleTheme}
        disabled={disabled} // Disable the button while processing
        variant="outline-light"
      >
        {theme.boolean ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-sun"></i>}
      </Button>
    </div>
  );
}

export default ToggleThemeButton;
