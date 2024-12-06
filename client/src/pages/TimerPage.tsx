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
import { editTimes, fetchCalendar, createCalendarEntry } from '../utils/routine-utils';
import { addDays } from 'date-fns';
import { start } from 'repl';
import { sendStreaks } from '../utils/streak-utils';
import { Streaks } from './CalendarPage';

const API_BASE_URL = 'http://localhost:3001'; // Backend base URL

function TimerPage(): JSX.Element {
const [show, setShow] = useState(false);
const [edit, setEdit] = useState(false);
const [errorMinute, setErrorMinute] = useState(false);
const [errorSecond, setErrorSecond] = useState(false);
const [userTime, setUserTime] = useState(0);
const [startTime, setStartTime] = useState(new Date());
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);
const {theme} = useContext(ThemeContext);
const {time, setTime, running, setRunning} = useContext(TimerContext);
const [calendarEntries, setCalendarEntries] = useState([]); // To store fetched calendar data
const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);
const {user, setUser } = useContext(UserContext);
const offset = (new Date()).getTimezoneOffset() / 60;

let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/calendar`;
    navigate(path);
  }
// Function to send timer data to the backend
  const sendToBackend = async () => {
    let day = startTime.toISOString().split('T')[0];

    const sleepHour = parseInt(startTime.toISOString().split('T')[1].split('Z')[0].split(':')[0]);
    // If the person goes to bed before 6 am, it counts as sleep for the previous day
    if (startTime === new Date() && sleepHour < 6) {
      day = addDays(startTime, -1).toISOString().split('T')[0];
    }

    const startTimeSplit = startTime.toISOString().split('T')[1].split('.')[0].split(':');
    let startTimeHour = parseInt(startTimeSplit[0]) - offset;
    if (startTimeHour < 0) {
      startTimeHour = 24 + startTimeHour;
    }
    const start = `${startTimeHour.toString().padStart(2, '0')}:${startTimeSplit[1]}:${startTimeSplit[2]}`;
    const slept = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    try {
      // Using the getUser endpoint instead
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch streaks');
      }

      const {data} = await response.json();
      if (hours >= 6) {
        console.log("add 1", data.current_streak + 1);
        const newCurrent = data.current_streak + 1 || 1;
        const newMax = ((data.max_streak > newCurrent) ? data.max_streak : newCurrent) || 1;
        await sendStreaks(user, newCurrent, newMax);
      }
      else {
        console.log("zero", data.max_streak);
        await sendStreaks(user, 0, data.max_streak || 0);
      }

      
    } catch (error) {
        console.error('Error fetching streaks:', error);
    }

    try {
      const entry = await fetchCalendar(user, day);
      if (entry.email === "") {
        createCalendarEntry(user, {
          id: crypto.randomUUID(),
          email: user,
          calendar_day: day,
          time_start: start,
          time_slept: slept,
          checklist: "",
          bedtime: "",
        });
      }
      else {
        editTimes(user, day, start, slept);
      }
    } catch (error) {
      console.error('Error sending time:', error);
    }
  };

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
};

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
      setStartTime(new Date());
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
        fontFamily: 'Montserrat, Helvetica',
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
          <Button variant="success" onClick={()=>{handleConfirm();}}>
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
          <Button variant="primary" onClick={()=>{handleConfirm();}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  ); 
}



export default TimerPage;