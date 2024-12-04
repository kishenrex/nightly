import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

function googleLoginProcedure(): void {
  window.open("http://localhost:3001/auth/google", "_self")
}

// login button leads to calendar page
function LoginButton(): JSX.Element {
  const { theme } = useContext(ThemeContext);

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button style={{
       borderWidth: '1px',
       borderColor: theme.borderColor,
       fontSize: '30px',
       color : theme.fontColor,
       backgroundColor: theme.background,
    }} className='loginButton' role="button" onClick={() => googleLoginProcedure()} variant="outline-light" > 
                  Sign in with Google
    </Button>
  </div>
  );
}

export default LoginButton;