import '../styles/LandingPageStyles.css';
import LoginButton from '../components/LoginButton';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ToggleThemeButton from '../components/ToggleThemeButton';

// first page the user sees
function LandingPage(): JSX.Element {
  const { theme } = useContext(ThemeContext);
return (
<div style= {{
    backgroundImage: `url("${require(`../styles/LandingPageImages/${theme.landingPageBackgroundImage}`)}")`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    }}className='backgroundImage' role="img" aria-label='backgroundImage'>

  <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', gap: '0.75rem', 
  color: theme.fontColor, padding: '15px' }}>
            <ToggleThemeButton></ToggleThemeButton>
          <span style={{ fontSize: '5.5rem', fontWeight: '600' }}>Nightly</span>
        </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <LoginButton></LoginButton>
  </div>
</div>
  );
}

export default LandingPage;