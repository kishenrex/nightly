import React, { useState } from 'react';
import LandingPageImage from '../styles/LightThemeLandingPage.jpg'; 
import Button from 'react-bootstrap/Button';
import '../styles/LandingPageStyles.css';

function LandingPage(): JSX.Element {
    //this.modalService.open(MyModalComponent, { size: <any>'xl' });
const titleStyle = {
      color: "black",
      fontSize: "90px",
      fontFamily: "Arial"
    };
const buttonStyle = {
      color: "white",
      backgroundColor: '#282c34',
      fontFamily: "Arial"
};
return (
    <div style= {{
      backgroundImage: `url(${LandingPageImage})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>

  <div 
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={titleStyle}>Nightly</h1>

    </div>
  <div 
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>

    <Button style={buttonStyle} variant="primary" size="lg">
        Login
    </Button>
    </div>
 

    </div>
  );
}

export default LandingPage;