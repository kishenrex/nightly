import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Container, Row, Col, Image } from 'react-bootstrap'; 
import axios from 'axios';

interface User {
  access_token: string;
};

interface Profile {
  picture: string;
  name: string;
  email: string;
};

function googleLoginProcedure(): void {
  window.open("http://localhost:3001/auth/google", "_self")
}

function LoginButton(): JSX.Element {
  

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button style={{
       borderWidth: '0px',
    }} className='loginButton' role="button" onClick={googleLoginProcedure}> 
            Sign in with Google
    </Button>
  </div>
  );
}

export default LoginButton;