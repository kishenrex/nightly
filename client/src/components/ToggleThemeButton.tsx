import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { ThemeContext, themes } from '../context/ThemeContext';

function ToggleThemeButton(): JSX.Element {
  const {theme, setTheme} = useContext(ThemeContext);
  const toggleTheme = () => {
    if (theme.boolean){
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };
return (
    <div>
        <Button style={{color: theme.fontColor, borderColor: theme.borderColor}}
        className='toggleButton' role="button" aria-label="toggleTheme" onClick={toggleTheme} variant="outline-light">
          { !theme.boolean ? <i className="bi bi-sun"></i> : <i className="bi bi-moon-stars"></i>}
        </Button>
    </div>
  );
}

export default ToggleThemeButton;

 