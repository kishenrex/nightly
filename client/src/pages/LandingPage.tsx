import '../styles/LandingPageStyles.css';
import LoginButton from '../components/LoginButton';

function LandingPage(): JSX.Element {
return (
<div className='backgroundImage' role="img">
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
    <h1 className='title'>Nightly</h1>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <LoginButton></LoginButton>
  </div>
</div>
  );
}

export default LandingPage;