import React, { useEffect, useState } from 'react';
import '../styles/TimerPageStyles.css';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeButton from '../components/HomeButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function TimerPage(): JSX.Element {
const [time, setTime] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [show, setShow] = useState(false);
const [edit, setEdit] = useState(false);
const [errorMinute, setErrorMinute] = useState(false);
const [errorSecond, setErrorSecond] = useState(false);
const [userTime, setUserTime] = useState(0);
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);

let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }

const handleEdit = () => {
  setEdit(true);
  setShow(false);
}
const handleClose = () => {
  setUserTime(0);
  setShow(false)
  setEdit(false);
};
const handleConfirm = () => {
  setShow(false);
};
const handleShow = () => {
  if (isRunning){
    setShow(true);
  }
};

const handleHours = (event: any) => {
    setHours(event.target.value);
  };
  
const handleMinutes = (event: any) => {
    setErrorMinute(false);
    if (event.target.value > 59){
      setErrorMinute(true);
    } else {
      setErrorMinute(false);
      setMinutes(event.target.value);
    }
  };

const handleSeconds = (event: any) => {
  setErrorSecond(false);
  if (event.target.value > 59){
    setErrorSecond(true);
  } else {
    setErrorSecond(false);
    setSeconds(event.target.value);
  }
};
useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
 if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        setUserTime(prevTime => prevTime + 1);
      }, 1000); // Update every 1 second
    }

    return () => clearInterval(interval); 
  }, [isRunning]);

  const handleTimer = () => {
    if (isRunning){
      setIsRunning(false);
      setHours((Math.floor((time / (1000 * 60 * 60)) % 24)));
      setMinutes(Math.floor(time / 60));
      setSeconds(time % 60);
      setTime(0);
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = (Math.floor((timeInSeconds / (1000 * 60 * 60)) % 24));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeUser = (timeInSeconds: number) => {
    const hours = (Math.floor((timeInSeconds / (1000 * 60 * 60)) % 24));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')} hours, ${minutes.toString().padStart(2, '0')} minutes, ${seconds.toString().padStart(2, '0')} seconds`;
  };
  
  return (
    <div style= {{backgroundColor: '#434343',  minHeight: '100vh'}}>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'right', 
        alignItems: 'right', 
        padding: '20px'
        }}>
        <HomeButton></HomeButton>
      </div>

      <div className='timer' data-testid="timer" >{formatTime(time)}s</div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}>
        <Button style= {{
        color: '#303030',
        fontFamily: 'Montserrat',
        backgroundColor: '#FFFFFF',
        fontSize: '35px',
        borderWidth: '2px',
        borderRadius: '10px',
        borderColor: 'white',
        width: '250px',
        }} className='stopButton' aria-label="start/stopButton" variant="primary"
        onClick={() =>{handleTimer(); handleShow();}}>
        {isRunning ? "Stop Timer" : "Start Timer"}
        </Button>
      </div>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time Slept</Modal.Title>
        </Modal.Header>
           <Modal.Body>You slept for {formatTimeUser(userTime)}
          </Modal.Body>
        <Modal.Footer>
          <Button aria-label="editButton"variant="secondary" onClick={()=>{handleEdit();}}>
            Edit
          </Button>
          <Button variant="primary" onClick={()=>{handleConfirm(); routeChange();}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={edit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time Slept</Modal.Title>
        </Modal.Header>
           <Modal.Body>
            Hours: 
            <input  
            data-testid="hours"          
            type="number" 
            value={hours} 
            min = {0}
            max = {24}
            onChange={handleHours} >
            </input>
            </Modal.Body>
            <Modal.Body>
            Minutes: 
            <input             
            type="number" 
            data-testid="minutes" 
            value={minutes} 
            min = {0}
            max = {59}
            onChange={handleMinutes} >
            </input>
             <Alert aria-label='alertMinute' show={errorMinute} variant="danger" onClose={() => setErrorMinute(false)} dismissible>
                <Alert.Heading>Warning: Over 59 minutes </Alert.Heading>
            </Alert>
                </Modal.Body>
              <Modal.Body>
            Seconds: 
            <input             
            required type="number" 
            data-testid="seconds" 
            value={seconds} 
            min = {0}
            max = {59}
            onChange={handleSeconds} >
            </input>
             <Alert aria-label='alertSecond' show={errorSecond} variant="danger" onClose={() => setErrorSecond(false)} dismissible>
                <Alert.Heading>Warning: Over 59 seconds </Alert.Heading>
            </Alert>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{handleConfirm(); routeChange();}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  ); 
}



export default TimerPage;