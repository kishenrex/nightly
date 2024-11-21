import '../styles/LandingPageStyles.css';
import LoginButton from '../components/LoginButton';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function LandingPage(): JSX.Element {
  
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