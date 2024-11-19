import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button, Container, Row, Col, Image } from 'react-bootstrap'; // Import components

interface User {
  access_token: string;
  // ... other properties
}

interface Profile {
  picture: string;
  name: string;
  email: string;
  // ... other properties
}

function LoginPage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
  <Container>
    <Row className="justify-content-md-center"> 
      <Col xs={12} sm={12} md={6}>
        <h2>Welcome to Nightly</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <Image src={profile.picture} alt="user image" roundedCircle /> 
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <Button variant="danger" onClick={logOut}> 
              Log out
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => login()}> 
            Sign in with Google
          </Button>
        )}
      </Col>
    </Row>
  </Container>
);
}

export default LoginPage;