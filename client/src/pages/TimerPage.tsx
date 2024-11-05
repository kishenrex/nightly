import React, { useState } from 'react';
import '../styles/TimerPageStyles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

function TimerPage(): JSX.Element {

  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const deadline = "December, 31, 2022";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();    

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return ( 
    <div >
  <div 
  style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', padding: "5px"}}>
    <Button  variant="primary" size="lg">
        Home
    </Button>
    </div>

    <div className="timer" role="timer">
      <div className="col-4">
        <div className="box">
          <p id="day">{days < 10 ? "0" + days : days}</p>
          <span className="text">Days</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
          <span className="text">Hours</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <span className="text">Minutes</span>
        </div>
      </div>
      <div className="col-4">
        <div className="box">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <span className="text">Seconds</span>
        </div>
      </div>
    </div>

     <div 
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "5px"}}>
    <Button  variant="primary" size="lg">
        Stop Timer
    </Button>
    </div>
    </div>
    
  );
}



export default TimerPage;