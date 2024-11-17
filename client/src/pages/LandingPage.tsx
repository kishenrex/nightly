import '../styles/LandingPageStyles.css';
import LoginButton from '../components/LoginButton';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

function LandingPage(): JSX.Element {
  const {theme} = useContext(ThemeContext);
return (
<div style= {{
    background: `url("${require(`../styles/LandingPageImages/${theme.landingPageBackgroundImage}`)}")`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    }}className='backgroundImage' role="img">
  <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '0.75rem', 
  color: theme.fontColor, padding: '15px' }}>
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