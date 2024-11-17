import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function LoginButton(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }
  const {theme} = useContext(ThemeContext);
return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button style={{
       borderWidth: '1px',
       borderColor: 'white',
       background: theme.background,
    }} className='loginButton' role="button" onClick={routeChange} variant="primary">
      Login
    </Button>
  </div>
  );
}

export default LoginButton;