import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useNavigate } from "react-router-dom";

function LoginButton(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/login`;
    navigate(path);
  }

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button style={{
       borderWidth: '0px',
    }} className='loginButton' role="button" onClick={routeChange} variant="primary">
      Login
    </Button>
  </div>
  );
}

export default LoginButton;