import Button from 'react-bootstrap/Button';
import '../styles/TimerPageStyles.css';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// home button leads to calendar page

function HomeButton(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }
  const { theme } = useContext(ThemeContext);
return (
    <div>
        <Button style={{
        color: theme.fontColor,
        borderColor: theme.borderColor,
        fontSize: '30px',
        borderWidth: '2px',
        borderRadius: '10px',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        }}role="button" aria-label="home" onClick={routeChange} variant="outline-light">
          <i className="bi bi-house"></i>
        </Button>
    </div>
  );
}

export default HomeButton;

 