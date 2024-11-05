import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useNavigate } from "react-router-dom";

function LandingPage(): JSX.Element {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/timer`; //testing for navigation
    navigate(path);
  }

return (
<div className='backgroundImage'>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h1 className='title' >Nightly</h1>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button className='loginButton' onClick={routeChange} variant="primary">
      Login
    </Button>
  </div>
</div>
  );
}

export default LandingPage;