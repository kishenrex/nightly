import { useContext, useState, useEffect } from "react";
import '../styles/checklist.css';
import { Link } from 'react-router-dom';
import { addDays } from 'date-fns';
import { 
  Button,
  Badge,
  Form,
  Modal,
  FormControl,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserAvatar } from '../components/UserAvatar';
import ToggleThemeButton from '../components/ToggleThemeButton';
import { ThemeContext } from '../context/ThemeContext';
import { createCalendarEntry, editRoutine, fetchCalendar } from "../utils/routine-utils";
import { CalendarEntry } from "../types";
import { parseRoutine, stringifyRoutine } from "../utils/parse";

// Types
export type Routine = {
  title: string;
  text: string;
  completed: boolean;
};

export type RoutinesMap = {
  [dateKey: string]: Routine[];
};

export type TimeMap = {
  [dateKey: string]: string;
};

type NightRoutineProps = {
  selectedDate: Date;
  routines: Routine[];
  routinesByDate: RoutinesMap;
  bedTime: string;
  timesByDate: TimeMap;
  onAddTime: (newDate: Date, bedTime: string) => void;
  onAddRoutine: (newDate: Date, routineTitle: string, routineText: string, completed: boolean) => void;
  onEditRoutine: (newDate: Date, routineTitle: string, routineText: string, index: number) => void;
  onToggleRoutine: (index: number) => void;
  onDeleteRoutine: (index: number) => void;
  onDeleteAllRoutine: (date: Date) => void;
};

type CalendarProps = {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  timesByDate: TimeMap;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
};
// Add these types at the top with other type definitions
type Streaks = {
  currentStreak: number;
  maxStreak: number;
};

const ChecklistPage: React.FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [routinesByDate, setRoutinesByDate] = useState<RoutinesMap>({});
  const [timesByDate, setTimesByDate] = useState<TimeMap>({});
  const [streaks, setStreaks] = useState<Streaks>({ currentStreak: 0, maxStreak: 0 });
  const [email, setEmail] = useState<string>("testuser@example.com");
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const port = process.env.PORT || 3001;

    // Add this useEffect to fetch streaks and email when component mounts
    useEffect(() => {
      const fetchStreaks = async () => {
          try {
              // Using the getUser endpoint instead
              const response = await fetch('http://localhost:3001/users/testuser@example.com', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch streaks');
              }
  
              const {data} = await response.json();
              setStreaks({
                  currentStreak: data.current_streak || 0,
                  maxStreak: data.max_streak || 0
              });
              setEmail(data.email)
          } catch (error) {
              console.error('Error fetching streaks:', error);
          }
      };
  
      const loadCalendar = async () => {
      try {
        console.log("email:", email)
        const response = await fetch(`http://localhost:3001/calendar/testuser@example.com`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch calendar');
        }

        const data = await response.json();
        let rout = null;
        data.calendar.forEach((d: CalendarEntry) => {
          if (parseInt(d.calendar_day.split("-")[1]) === month) {
            rout = parseRoutine(d.checklist);
            rout.forEach((r: Routine) => {
              if (!routinesByDate[d.calendar_day] && r.title != undefined) {
                handleAddRoutine(new Date(d.calendar_day), r.title, r.text, r.completed);
              }
            });
          }
        });
        } catch (error) {
          console.error('Error fetching calendar:', error);
      }
      };
  
      fetchStreaks();
      loadCalendar();
    }, [month]);

    useEffect(() => {
      const modifyCalendar = async () => {
        try {
          const dateKey = getDateKey(selectedDate)
          const entry = await fetchCalendar(email, dateKey);
          if (entry.email === "") {
            createCalendarEntry(email, {
              id: "",
              email: email,
              calendar_day: dateKey,
              time_start: "",
              time_slept: "",
              checklist: "",
              bedtime: "00:00",
            });
          }
          if (routinesByDate[dateKey] != undefined) {
            editRoutine(email, dateKey, stringifyRoutine(routinesByDate[dateKey]));
          }
        } catch (error) {
          console.error('Error fetching calendar:', error);
        }
      }

      modifyCalendar();
    }, [routinesByDate]);

  const getDateKey = (date: Date): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const handleSelectDate = async (date: Date): Promise<void> => {
    setSelectedDate(date);
    try {
      const entry = await fetchCalendar(email, getDateKey(date));
      if (entry.email === "") {
        createCalendarEntry(email, {
          id: "",
          email: email,
          calendar_day: getDateKey(date),
          time_start: "",
          time_slept: "",
          checklist: "",
          bedtime: "00:00",
        });
      }
    }
    catch (error) {
      console.error('Error clicking date:', error);
    }
  };

  const handleAddTime = (date: Date, bedTime: string): void => {
    const dateKey = getDateKey(date);
    setTimesByDate(prev => ({
      ...prev,
      [dateKey]: bedTime
    }));
  };

  const handleAddRoutine = (date: Date, routineTitle: string, routineText: string, completed: boolean) => {
    const dateKey = getDateKey(date);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { title: routineTitle, text: routineText, completed: false }]
    }));
  };

  const handleEditRoutine = (date: Date, routineTitle: string, routineText: string, index: number) => {
    const dateKey = getDateKey(date);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map((routine, i) => 
        i === index ? { title: routineTitle, text: routineText, completed: routine.completed } : routine
      )
    }));
  };

  const handleToggleRoutine = (index: number) => {
    const dateKey = getDateKey(selectedDate);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map((routine, i) => 
        i === index ? { ...routine, completed: !routine.completed } : routine
      )
    }));
  };

  const handleDeleteRoutine = (index: number) => {
    const dateKey = getDateKey(selectedDate);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, i) => i !== index)
    }));
  };

  const deleteAllRoutine = (date: Date): void => {
    const dateKey = getDateKey(date);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: []
    }));
  };

  const { theme }  = useContext(ThemeContext);

  return (
    <div style={{ height: '100vh', backgroundColor: theme.background, display: 'flex', flexDirection: 'column' }}>
      {/* Simplified Header */}
      <div style={{ backgroundColor: theme.navbar, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: theme.fontColor }}>
           { theme.boolean ? <i style={{ fontSize: '2rem'}} className="bi bi-sun"></i> : <i style={{ fontSize: '2rem'}} className="bi bi-moon-stars"></i>}
          <span style={{ fontSize: '2rem', fontWeight: '600' }}>Nightly</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/timer" className="text-decoration-none">
            <Button  style={{color: theme.fontColor, borderColor: theme.borderColor}} variant="outline-light" className="d-flex align-items-center gap-2">
              <i className="bi bi-clock fs-5"></i>
              <span>Sleep Stopwatch</span>
            </Button>
          </Link>

          <div className="text-white text-center border-start border-end px-3">
            <div className="d-flex align-items-center gap-2">
              <i style={{color: theme.fontColor}} className="bi bi-fire"></i>
              <span style={{color: theme.fontColor}}>Current Streak</span>
            </div>
            <Badge bg="success" className="fs-6">{streaks.currentStreak}</Badge>
          </div>

          <div className="text-center border-start border-end px-3">
            <div style={{color:theme.fontColor}} className="d-flex align-items-center gap-2">
              <i className="bi bi-fire"></i>
              <span>Max Streak</span>
            </div>
            <Badge bg="success" className="fs-6">{streaks.maxStreak}</Badge>
          </div>
          
          <div className="d-flex align-items-center gap-5">
            <Link to="/profile" className="text-white">
              <UserAvatar/>
            </Link>
            <div style={{paddingRight: '20px'}}>
                <ToggleThemeButton></ToggleThemeButton>
            </div>

          </div>

          <div className="d-flex align-items-center gap-5" style={{paddingRight: '40px'}}>
          <Button  style={{color: theme.fontColor, borderColor: theme.borderColor}} variant="outline-light" className="d-flex align-items-center gap-2"
              onClick={() => setShowModal(true)}>
              <i className="bi bi-question-circle fs-5"></i>
              <span>Help</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: '1 1 auto', padding: '1.5rem', minHeight: '0' }}>
        <div style={{ display: 'flex', gap: '1.5rem', height: '100%'}}>
          {/* Calendar Panel */}
          <div style={{ flex: '1 1 auto', width: '80%',
           borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column'}}>
            <h2 style={{color: theme.fontColor}}className="mb-4">
              <i className="bi bi-calendar3 me-2"></i>
              Calendar
            </h2>
            <Calendar 
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
              timesByDate={timesByDate}
              currentMonth={month}
              setCurrentMonth={setMonth}
            />
          </div>

          {/* Routine Panel */}
          <div style={{ 
            width: '550px', 
            borderRadius: '0.5rem', 
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.foreground
          }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: theme.fontColor }}>
               { theme.boolean ? <i style={{ fontSize: '2rem'}} className="bi bi-sun"></i> : <i style={{ fontSize: '2rem'}} className="bi bi-moon-stars"></i>}
                Night Routine Checklist for {selectedDate?.toDateString()}
            </h4>
            <NightRoutine 
              selectedDate={selectedDate}
              routines={routinesByDate[getDateKey(selectedDate)] || []}
              routinesByDate={routinesByDate}
              bedTime = {timesByDate[getDateKey(selectedDate)] || "00:00"}
              timesByDate={timesByDate}
              onAddRoutine={handleAddRoutine}
              onEditRoutine={handleEditRoutine}
              onToggleRoutine={handleToggleRoutine}
              onDeleteRoutine={handleDeleteRoutine}
              onDeleteAllRoutine={deleteAllRoutine}
              onAddTime={handleAddTime}
            />
          </div>

          {/*Instructions*/}
          <Modal show={showModal} onHide={() => setShowModal(false)} 
            size="lg" centered >
              <div style={{backgroundColor: theme.navbar, color: theme.fontColor, borderRadius: '5px'}}>
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>Help</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <dl>
                <dt>Calendar: </dt>
                <dd>Click on a day to view and edit the night routine checklist for that day. Click on the arrow keys
                  to switch months. Each cell also holds the expected bedtime/actual sleep time for the day.
                </dd>
                <dt>Night Routine: </dt>
                <dd>Each night routine has a main description that is required and then any extra details or notes the user 
                  would want to add that is optional. The night routines can be anything the user would want/need to do before they sleep.
                </dd>
                <dt>Bedtime: </dt>
                <dd>The user can set an expected/desired bedtime for each day. Once the day passes, it is replaced by the actual
                  elapsed sleep time they record each night. For example, before the current day it might be 10:00 pm for the expected 
                  bedtime, and then after the current day, it could show 8:32:05 (8 hours, 32 minutes, and 5 seconds) for the actual elapsed sleep time. 
                </dd>
                <dt>Repeat: </dt>
                <dd>The user can set recurrences for each night routine by choosing the days of the week to repeat, along
                  with the number of weeks to repeat it for. This will completely replace any previously set routines on those days with the new ones.
                </dd>
                <dt>Night Routines Window: </dt>
                <dd>The window on the right allow the user to view and edit all of their night routines for a day. 
                  When they complete a night routine, that is also where they check the item off the checklist. If the user checks all of the
                  night routines off, they will continue their streak.
                </dd>
                <dt>Sleep Stopwatch: </dt>
                <dd>The stopwatch is used to keep track of how much sleep the user gets every night. Right before the
                  user sleeps, they should start the stopwatch. When they wake up, they should immediately end the stopwatch. After ending
                  the stopwatch, they can keep the lapsed time for the bedtime, or they can edit the time if it is inaccurate.
                </dd>
                <dt>Streaks: </dt>
                <dd>The streak is used to keep the user on task with completing all of their tasks each day. Both the current 
                  streak and the max streak is displayed for the user to keep track. </dd>
                <dt>Toggle Theme: </dt>
                <dd>The user can toggle between the day and night theme at their own convenience. </dd>
              </dl>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selectedDate, timesByDate, currentMonth, setCurrentMonth }): JSX.Element => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate || today);
  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const getDateKey = (date: Date): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const convertTime = (time: string) => {
    if (!time) {
      return;
    }
    const [hours, minutes] = time.split(':').map(Number);
    let period = 'am';

    let newHours = hours;
    if (hours >= 12) {
      period = 'pm';
      if (hours > 12) newHours = hours - 12;
    } else if (hours === 0) {
      newHours = 12;
    }

    return `${newHours}:${minutes.toString().padStart(2, '0')}${period}`;
  };

  const calendarDays = Array(35).fill(null).map((_, index) => {
    const dayNumber = index - firstDayWeekday + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const needsSixWeeks = calendarDays.filter(day => day !== null).length + firstDayWeekday > 35;
  if (needsSixWeeks) {
    calendarDays.push(...Array(7).fill(null));
  }

  const {theme} = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0'}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 style={{color: theme.fontColor}}className="m-0">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h3>
        <div>
          <Button variant="outline-light" onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)); setCurrentMonth(currentMonth - 1); } }>
            <i style={{color: theme.fontColor, borderColor: theme.borderColor}} className="bi bi-chevron-left"></i>
          </Button>
          <Button variant="outline-light" onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)); setCurrentMonth(currentMonth + 1); } }>
            <i style={{color: theme.fontColor, borderColor: theme.borderColor}} className="bi bi-chevron-right"></i>
          </Button>
        </div>
      </div>

      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minHeight: '0', background: theme.calendarBackground}}>
        <table className="table table-bordered m-0" style={{ flex: '1', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {days.map(day => (
                <th key={day} className="text-center py-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: '100%' }}>
            {Array.from({ length: needsSixWeeks ? 6 : 5 }).map((_, weekIndex) => (
              <tr key={weekIndex} style={{ height: `${100 / (needsSixWeeks ? 6 : 5)}%` }}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const dayNumber = calendarDays[weekIndex * 7 + dayIndex];
                  return (
                    <td 
                      key={dayIndex} 
                      onClick={() => dayNumber && onSelectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber))}
                      style={{ 
                        cursor: dayNumber ? 'pointer' : 'default',
                        backgroundColor: selectedDate?.getDate() === dayNumber && 
                                       selectedDate?.getMonth() === currentDate.getMonth() &&
                                       selectedDate?.getFullYear() === currentDate.getFullYear()
                                       ? '#e6f3ff' 
                                       : dayNumber ? 'white' : '#f8f9fa',
                        padding: '0'
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <span style={{ fontSize: '1.1rem' }}>{dayNumber || ''} <br/> 
                        {dayNumber && convertTime(timesByDate[getDateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber || 0))])} </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const NightRoutine: React.FC<NightRoutineProps> = ({ 
  selectedDate, 
  routines, 
  routinesByDate,
  bedTime,
  timesByDate,
  onAddTime,
  onAddRoutine, 
  onEditRoutine,
  onToggleRoutine, 
  onDeleteRoutine,
  onDeleteAllRoutine
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalRep, setShowModalRep] = useState<boolean>(false);
  const [showModalTime, setShowModalTime] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [bedTimeText, setBedTimeText] = useState({
    text: 'Bedtime',
    icon: 'bi bi-cloud-moon'});

  const [newTitle, setNewTitle] = useState<string>('');
  const [newRoutine, setNewRoutine] = useState<string>('');
  const [newRepeat, setNewRepeat] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [numRepeat, setNumRepeat] = useState<number>(1);

  const isActiveKeys = {
    'Sun': false,
    'Mon': false,
    'Tue': false,
    'Wed': false,
    'Thu': false,
    'Fri': false,
    'Sat': false,
  };
  const [isActive, setIsActive] = useState<typeof isActiveKeys>(isActiveKeys);

  const convertTime = (time: string) => {
    if (!time) {
      return "";
    }
    const [hours, minutes] = time.split(':').map(Number);
    let period = 'am';

    let newHours = hours;
    if (hours >= 12) {
      period = 'pm';
      if (hours > 12) newHours = hours - 12;
    } else if (hours === 0) {
      newHours = 12;
    }

    return `${newHours}:${minutes.toString().padStart(2, '0')}${period}`;
  };

  const openAddRoutine = (): void => {
    setNewTitle('');
    setNewRoutine('');
    setShowModal(true);
  }

  const repeatAddRoutine = (date: Date) => {
    const dateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    onDeleteAllRoutine(date);
    routinesByDate[dateKey]?.forEach(rout => {
      onAddRoutine(date, rout.title, rout.text, rout.completed);
    });
    onAddTime(date, timesByDate[dateKey]);
  }

  const handleSubmit = (): void => {
    if (newTitle.trim()) {
      onAddRoutine(selectedDate, newTitle.trim(), newRoutine.trim(), false);
      setShowModal(false);
    }
  };

  const handleSubmitEdit = (): void => {
    if (newTitle.trim()) {
      onEditRoutine(selectedDate, newTitle.trim(), newRoutine.trim(), currIndex);
      setShowModalEdit(false);
    }
  };

  const handleSubmitRep = (): void => {
    if (newRepeat.length > 0) {
      const day = selectedDate?.getDay();
      let populate = numRepeat;
      let updated = null;
      newRepeat.forEach(element => {
        populate =numRepeat;
        updated = selectedDate;
        switch(element) {
          case "Sun":
            updated = addDays(selectedDate, 0-day);
            if (day !== 0) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }

            break;
          case "Mon":
            updated = addDays(selectedDate, 1-day);
            if (day !== 1) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          case "Tue":
            updated = addDays(selectedDate, 2-day);
            if (day !== 2) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          case "Wed":
            updated = addDays(selectedDate, 3-day);
            if (day !== 3) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          case "Thu":
            updated = addDays(selectedDate, 4-day);
            if (day !== 4) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          case "Fri":
            updated = addDays(selectedDate, 5-day);
            if (day !== 5) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          case "Sat":
            updated = addDays(selectedDate, 6-day);
            if (day !== 6) {
              repeatAddRoutine(updated);
            }
            updated = addDays(updated, 7);
            
            while (populate > 0) {
              repeatAddRoutine(updated);
              populate -= 1;
              updated = addDays(updated, 7);
            }
            break;
          default:
            break;
        }
      });
    }

    setNumRepeat(1);
    setNewRepeat([]);
    setIsActive((prevState) => ({...prevState, ["Sun"]: false}));
    setIsActive((prevState) => ({...prevState, ["Mon"]: false}));
    setIsActive((prevState) => ({...prevState, ["Tue"]: false}));
    setIsActive((prevState) => ({...prevState, ["Wed"]: false}));
    setIsActive((prevState) => ({...prevState, ["Thu"]: false}));
    setIsActive((prevState) => ({...prevState, ["Fri"]: false}));
    setIsActive((prevState) => ({...prevState, ["Sat"]: false}));
    setShowModalRep(false);
  };

  const handleMouseEnter = () => {
    setBedTimeText({
      text: convertTime(bedTime), 
      icon: 'bi bi-cloud-moon', 
    });
  };

  // Revert content when mouse leaves
  const handleMouseLeave = () => {
    setBedTimeText({
      text: 'Bedtime',  
      icon: 'bi bi-cloud-moon', 
    });
  };

  const handleDayClick = (day: string) => {
    if (newRepeat.includes(day)) {
        const filtered = newRepeat.filter(aDay => aDay !== day);
        setNewRepeat([...filtered]);
        setIsActive((prevState) => ({...prevState, [day]: false}));
    }
    else {
        setNewRepeat([...newRepeat, day])
        setIsActive((prevState) => ({...prevState, [day]: true}));
    }
  }

  const handleWeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 52) {
      setNumRepeat(52);
    } 
    else if (value < 1) {
      setNumRepeat(1);
    }
    else {
      setNumRepeat(value);
    }
  }

  const WeekRecurrence = () => {
    return (
    <div >
        <h4 style={{ fontSize: '1.1rem', paddingRight: '1rem', color: theme.fontColor }}>Repeat on: </h4>
        <div style={{ display: 'inline-flex', marginBottom: "20px",  color: theme.fontColor }}>
            <DayButton day={"Sun"} />
            <DayButton day={"Mon"} />
            <DayButton day={"Tue"} />
            <DayButton day={"Wed"} />
            <DayButton day={"Thu"} />
            <DayButton day={"Fri"} />
            <DayButton day={"Sat"} />
        </div>
        <br/>
        <div style={{ display: 'inline-flex' }}>
            <h4 style={{ fontSize: '1.1rem', paddingRight: '1rem',  color: theme.fontColor  }}>For</h4>
            <input type="number" min="1" max="52" style={{backgroundColor: "transparent",  color: theme.fontColor , 
                borderColor: "white", borderRadius: "5px", width: "30%", marginRight: "15px"}}
                onBlur={handleWeekInput}></input>
            <h4 style={{ fontSize: '1.1rem', paddingRight: '1rem',  color: theme.fontColor  }}>Week(s)</h4>
        </div>
    </div>
    );
  };

    const DayButton = (props: { day: keyof typeof isActiveKeys}) => {
        return (
            <Button className={`${isActive[props.day] ? 'active' : ''}`} variant="outline-light" data-bs-toggle="button"
                style={{ margin: '2px 4px', padding: '6px 12px', borderColor: theme.borderColor, color: theme.fontColor }}
                onClick={() => handleDayClick(props.day)}
            > {props.day} </Button> 
        );
    };
    
 const { theme }  = useContext(ThemeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxHeight:"90%" }}>
      <div style={{ flex: '1', overflowY: 'auto', marginBottom: '1rem' }}>
        {selectedDate ? (
          <Form>
            {routines.map((routine, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                <div style={{ width: "90%", maxWidth: "90%", wordBreak: "break-word", 
                    overflowWrap: "break-word", borderStyle: "solid", 
                    borderRadius: "5px", borderColor: theme.borderColor, borderWidth: "1px", padding: "8px"}}>
                    <Form.Check 
                    type="checkbox"
                    id={`routine-${index}`}
                    label={routine.title}
                    checked={routine.completed}
                    onChange={() => onToggleRoutine(index)}
                    style={{ fontSize: '1.1rem', paddingRight: '1rem', color: theme.fontColor }}
                    />
                    <p style={{ fontSize: '1.1rem', paddingRight: '1rem', color: theme.fontColor, margin: "0px" }}> {routine.text} </p>
                </div>
                <div>
                <Button 
                  size="sm"
                  onClick={(e) => {
                    setShowModalEdit(true);
                    setNewTitle(routine.title);
                    setNewRoutine(routine.text);
                    setCurrIndex(index);
                  }}
                  style={{ padding: '0.2rem 0.4rem', margin: "4px", color: theme.fontColor,  borderColor: theme.borderColor }}
                  variant="outline-light" 
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button 
                  size="sm"
                  onClick={() => onDeleteRoutine(index)}
                  style={{ padding: '0.2rem 0.4rem', margin: "4px", display: "block" , color: theme.fontColor, borderColor: theme.borderColor}}
                  variant="outline-light" 
                >
                  <i className="bi bi-dash-lg"></i>
                </Button>
                </div>
              </div>
            ))}
          </Form>
        ) : (
          <p style={{color: theme.fontColor}} className="text-white" >Select a day to see routines</p>
        )}
      </div>

        <div style={{display: "flex"}}>
      <Button 
      style={{color: theme.fontColor, width: "33%", borderColor: theme.borderColor, borderRadius: '5px'}}
        variant="outline-light" 
        onClick={openAddRoutine}
        size="lg"
      >
        <i className="bi bi-plus-lg me-2"></i>
        <br/>
        Routine
      </Button>

      <Button 
        variant="outline-light" 
        onClick={() => setShowModalTime(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        size="lg"
        style={{width: "33%", borderColor: theme.borderColor, borderRadius: '5px'}}
      >
        <i style={{color: theme.fontColor}} className={`bi ${bedTimeText.icon}`}></i><br/>
         <span style={{color: theme.fontColor}}>
        {bedTimeText.text}
        </span>
      </Button>

      <Button 
        variant="outline-light" 
        onClick={() => setShowModalRep(true)}
        size="lg"
        style={{width: "33%", borderColor: theme.borderColor, borderRadius: '5px'}}
 
      >
        <i  style={{color: theme.fontColor}}
        className="bi bi-arrow-counterclockwise"></i>
        <br/>
       <span style={{color: theme.fontColor}}>
        Repeat
        </span> 
      </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} 
        size="lg" centered >
          <div style={{backgroundColor: theme.navbar, color:theme.fontColor, borderRadius: '5px'}}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Add New Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Enter new routine  e.g. Brush teeth"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
          />
          <br/>
          <FormControl
            placeholder="Enter routine description (OPTIONAL) e.g. Make sure to switch out old toothbrush"
            value={newRoutine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRoutine(e.target.value)}
          />
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button style= {{color: theme.fontColor, borderColor: theme.borderColor}}
           variant="outline-light" onClick={handleSubmit}>
            Add Routine
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)} 
        size="lg" centered >
          <div style={{backgroundColor: theme.navbar, color: theme.fontColor, borderRadius: '5px'}}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Edit Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Enter new routine  e.g. Brush teeth"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
          />
          <br/>
          <FormControl  style= {{color: theme.fontColor, backgroundColor: theme.background, borderColor: theme.borderColor}}
            placeholder="Enter routine description (OPTIONAL) e.g. Make sure to switch out old toothbrush"
            value={newRoutine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRoutine(e.target.value)}
          />
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button  style= {{color: theme.fontColor, borderColor: theme.borderColor}} variant="outline-light" onClick={handleSubmitEdit}>
            Finish
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showModalRep} onHide={() => setShowModalRep(false)} 
        size="lg" centered>
          <div style={{backgroundColor: theme.navbar, color: theme.fontColor, borderRadius: '5px'}}>
        <Modal.Header closeButton closeVariant="white" onClick={handleSubmitRep}>
          <Modal.Title  style= {{color: theme.fontColor, borderColor: theme.borderColor}} >Set Recurring Days</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WeekRecurrence/>
        </Modal.Body>
        <Modal.Footer>
          <Button  style= {{color: theme.fontColor, borderColor: theme.borderColor}} variant="outline-light" onClick={handleSubmitRep}>
            Complete
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showModalTime} onHide={() => setShowModalTime(false)} 
        size="lg" centered>
          <div style={{backgroundColor: theme.navbar, color: theme.fontColor, borderRadius: '5px'}}>
        <Modal.Header closeButton closeVariant="white" onClick={handleSubmitRep}>
          <Modal.Title  style= {{color: theme.fontColor, borderColor: theme.borderColor}}>Set Bedtime</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <input  style= {{color: theme.fontColor, borderColor: theme.borderColor}} value={bedTime} type="time" onChange={(e) => {onAddTime(selectedDate, e.target.value)}}> 
          </input>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ChecklistPage;