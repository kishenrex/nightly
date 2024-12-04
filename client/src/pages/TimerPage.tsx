import { useContext, useEffect, useState } from 'react';
import '../styles/TimerPageStyles.css';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeButton from '../components/HomeButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ThemeContext } from '../context/ThemeContext';
import { TimerContext } from '../context/TimerContext';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const API_BASE_URL = 'http://localhost:3001'; // Backend base URL

function TimerPage(): JSX.Element {
const [show, setShow] = useState(false);
const [edit, setEdit] = useState(false);
const [errorMinute, setErrorMinute] = useState(false);
const [errorSecond, setErrorSecond] = useState(false);
const [userTime, setUserTime] = useState(0);
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);
const {theme} = useContext(ThemeContext);
const {time, setTime, running, setRunning} = useContext(TimerContext);
const [calendarEntries, setCalendarEntries] = useState([]); // To store fetched calendar data
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);
const {user, setUser } = useContext(UserContext);

let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }
// Function to send timer data to the backend
  const sendToBackend = async () => {
    try {
      const calendarEntry = {
        id: crypto.randomUUID(), // Generate a unique ID
        email: `${user}`, // Replace with dynamic user email
        calendar_day: new Date().toISOString().split('T')[0], // Current date
        time_start: new Date().toISOString(), // Replace with actual start time
        time_slept: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        checklist: JSON.stringify([]),
        bedtime: '22:00:00', // Example static value
      };

      const response = await axios.post(`${API_BASE_URL}/calendar/${user}`, calendarEntry);
      console.log('Timer data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending timer data to backend:', error);
      setError('Failed to save timer data. Please try again.');
    }
  };
  
  const fetchCalendarEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/calendar/${user}`); // Backend endpoint
      const { data } = await response.json();
      console.log('Fetched calendar entries:', data);
    } catch (err) {
      console.error('Error fetching calendar entries:', err);
    }
  };

  // Initialize calendar data on component mount
  useEffect(() => {
    fetchCalendarEntries();
  }, []);


  const handleConfirm = async () => {
    console.log('Saving timer data to backend...');
    await sendToBackend(); // Send data to the backend
    setShow(false);
    setTime(0);
    routeChange(); // Navigate to home or calendar page
  };
const handleEdit = () => {
  setEdit(true);
  setShow(false);
}
const handleClose = () => {
  setUserTime(0);
  setShow(false)
  setEdit(false);
};

const handleShow = () => {
  if (running){
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

  const handleTimer = () => {
    if (running){
      setRunning(false);
      setHours((Math.floor(((time/1000) / (1000 * 60 * 60)) % 24)));
      setMinutes(Math.floor((time/1000) / 60));
      setSeconds((time/1000) % 60);
    } else {
      setRunning(true);
    }
  };

  const formatTime = (timeInMiliSeconds: number) => {
    const timeInSeconds = Math.floor(timeInMiliSeconds / 1000);
    const hours = (Math.floor((timeInSeconds / (1000 * 60 * 60)) % 24));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeUser = () => {
    const userHours = hours;
    const userMinutes = minutes;
    const userSeconds = seconds;
    return `${userHours .toString().padStart(2, '0')} hours, ${userMinutes.toString().padStart(2, '0')} minutes, ${userSeconds.toString().padStart(2, '0')} seconds`;
  };
  
  return (
    <div style= {{backgroundColor: theme.background,  minHeight: '100vh'}}>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'right', 
        alignItems: 'right', 
        padding: '20px'
        }}>
        <HomeButton></HomeButton>
      </div>

      <div style={{color: theme.timerColor}}className='timer' data-testid="timer" >{formatTime(time)}s</div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}>
        <Button style= {{
        color: theme.fontColor,
        backgroundColor: theme.foreground,
        fontFamily: 'Montserrat',
        fontSize: '35px',
        borderWidth: '2px',
        borderRadius: '10px',
        borderColor: 'white',
        width: '250px',
        }} className='stopButton' aria-label="start/stopButton" variant="outline-light"
      onClick={() => {handleTimer(); handleShow();}}>
        {running ? "Stop Timer" : "Start Timer"}
        </Button>
      </div>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time Slept</Modal.Title>
        </Modal.Header>
           <Modal.Body>You slept for {formatTimeUser()}
          </Modal.Body>
        <Modal.Footer>
          <Button aria-label="cancelButton"variant="secondary" onClick={()=>{handleClose();}}>
            Cancel
          </Button>
          <Button aria-label="editButton"variant="primary" onClick={()=>{handleEdit();}}>
            Edit
          </Button>
          <Button variant="success" onClick={()=>{handleConfirm(); routeChange();}}>
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