import '../styles/LandingPageStyles.css';
import LoginButton from '../components/LoginButton';

function LandingPage(): JSX.Element {
return (
<div className='backgroundImage' role="img">
  <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '0.75rem', color: 'black', padding: '15px' }}>
          <i className="bi bi-moon-stars" style={{ fontSize: '5rem' }}></i>
          <span style={{ fontSize: '5.5rem', fontWeight: '600' }}>Nightly</span>
        </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <LoginButton></LoginButton>
  </div>
</div>
  );
}

export default LandingPage;