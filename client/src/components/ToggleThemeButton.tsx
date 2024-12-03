import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { ThemeContext, themes } from '../context/ThemeContext';
import axios from 'axios';

function ToggleThemeButton(): JSX.Element {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = async () => {
    const newTheme = theme.boolean ? themes.light : themes.dark; 

    // Optimistically update the UI
    setTheme(newTheme);

    try {
      // Save the theme to the backend
      await axios.patch(`/users/${theme.email}/theme`, { theme: newTheme.boolean ? 'dark' : 'light' });
    } catch (error) {
      console.error("Failed to update theme on the backend:", error);

      // Revert to the previous theme on failure
      setTheme(theme);
    }
  };

  return (
    <div>
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
        variant="outline-light"
      >
        {theme.boolean ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-sun"></i>}
      </Button>
    </div>
  );
}

export default ToggleThemeButton;
