import React, { useEffect, useState } from 'react';
import '../styles/TimerPageStyles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';

function TimerPage(): JSX.Element {
const [time, setTime] = useState(0);
const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
 if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update every 1 second
    }

    return () => clearInterval(interval); 
  }, [isRunning]);

  const handleTimer = () => {
    if (isRunning){
      setIsRunning(false);
      setTime(0);
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = (Math.floor((time / (1000 * 60 * 60)) % 24));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', padding: "20px"}}>
        <Button className='homeButton' variant="primary">
          <i className="bi bi-house"></i>
        </Button>
      </div>

      <div className='timer'>{formatTime(time)}s</div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button className='stopButton' variant="primary"
        onClick={handleTimer}>
        {isRunning ? "Stop Timer" : "Start Timer"}
        </Button>
      </div>
    </div>
  );
   
}



export default TimerPage;