import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';
import { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';

interface User {
  access_token: string;
}

interface Profile {
  picture: string;
  name: string;
  email: string;
}


function LoginButton(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { theme } = useContext(ThemeContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          });
          setProfile(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchProfile();
  }, [user]); // Keep user in the dependency array

  const logOut = () => {
    googleLogout();
    setUser(null); // Clear user state
    setProfile(null);
  };

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <Button style={{
       borderWidth: '1px',
       borderColor: theme.borderColor,
       fontSize: '30px',
       color : theme.fontColor,
       backgroundColor: theme.background,
    }} className='loginButton' role="button" onClick={() => login()} variant="outline-light" > 
                  Sign in with Google
    </Button>
  </div>
  );
}

export default LoginButton;