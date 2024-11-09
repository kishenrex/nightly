import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useNavigate } from "react-router-dom";
import LoginButton from '../components/LoginButton';

function LandingPage(): JSX.Element {
return (
<div className='backgroundImage' role="img">
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h1 className='title' >Nightly</h1>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <LoginButton></LoginButton>
  </div>
</div>
  );
}

export default LandingPage;