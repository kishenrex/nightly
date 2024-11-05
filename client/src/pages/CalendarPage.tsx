import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Navbar,
  Nav,
  Button,
  Container,
  Badge,
  Form,
  Modal,
  FormControl
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Types remain the same
type Routine = {
  text: string;
  completed: boolean;
};

type RoutinesMap = {
  [dateKey: string]: Routine[];
};

type NightRoutineProps = {
  selectedDate: Date | null;
  routines: Routine[];
  onAddRoutine: (routineText: string) => void;
  onToggleRoutine: (index: number) => void;
  onDeleteRoutine: (index: number) => void;
};

type CalendarProps = {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
};

const CalendarPage: React.FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [routinesByDate, setRoutinesByDate] = useState<RoutinesMap>({});

  const getDateKey = (date: Date | null): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const handleSelectDate = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleAddRoutine = (routineText: string): void => {
    const dateKey = getDateKey(selectedDate);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { text: routineText, completed: false }]
    }));
  };

  const handleToggleRoutine = (index: number): void => {
    const dateKey = getDateKey(selectedDate);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map((routine, i) => 
        i === index ? { ...routine, completed: !routine.completed } : routine
      )
    }));
  };

  const handleDeleteRoutine = (index: number): void => {
    const dateKey = getDateKey(selectedDate);
    setRoutinesByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#2d1b69', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" style={{ flex: '0 0 auto' }}>
        <Container fluid>
          <Navbar.Brand href="#home">
            <i className="bi bi-person-badge me-2"></i>
            Profile
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#settings">
                <i className="bi bi-gear me-1"></i>
                Settings
              </Nav.Link>
              <Nav.Link href="#link1">Link</Nav.Link>
              <Nav.Link href="#link2">Link</Nav.Link>
              <Nav.Link href="#link3">Link</Nav.Link>
              <Nav.Link href="#link4">Link</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-4">
              <Link to="/timer" className="text-white text-decoration-none">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-clock fs-5"></i>
                  <span>Sleep Timer</span>
                </div>
              </Link>

              <div className="text-white text-center border-start border-end px-3">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-fire"></i>
                  <span>Current Streak</span>
                </div>
                <Badge bg="success" className="fs-6">100</Badge>
              </div>
              
              <div className="d-flex align-items-center gap-3">
                <Link to="/profile" className="text-white">
                  <i className="bi bi-person-circle" style={{ fontSize: '3.5rem' }}></i>
                </Link>
                <Button variant="outline-light" className="ms-2">
                  <i className="bi bi-moon-stars"></i>
                </Button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div style={{ flex: '1 1 auto', padding: '1.5rem', minHeight: '0' }}>
        <div style={{ display: 'flex', gap: '1.5rem', height: '100%'}}>
          {/* Calendar Panel */}
          <div style={{ flex: '1 1 auto', width: '80%', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h2 className="mb-4">
              <i className="bi bi-calendar3 me-2"></i>
              Calendar
            </h2>
            <Calendar 
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
            />
          </div>

          {/* Routine Panel */}
          <div style={{ 
            width: '500px', 
            backgroundColor: '#1a103f', 
            borderRadius: '0.5rem', 
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 className="text-white mb-4">
              <i className="bi bi-moon-stars me-2"></i>
              Night Routine for the Day
            </h2>
            <NightRoutine 
              selectedDate={selectedDate}
              routines={routinesByDate[getDateKey(selectedDate)] || []}
              onAddRoutine={handleAddRoutine}
              onToggleRoutine={handleToggleRoutine}
              onDeleteRoutine={handleDeleteRoutine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selectedDate }): JSX.Element => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate || today);
  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = Array(35).fill(null).map((_, index) => {
    const dayNumber = index - firstDayWeekday + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const needsSixWeeks = calendarDays.filter(day => day !== null).length + firstDayWeekday > 35;
  if (needsSixWeeks) {
    calendarDays.push(...Array(7).fill(null));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h3>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Button variant="outline-primary" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
            <i className="bi bi-chevron-right"></i>
          </Button>
        </div>
      </div>

      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minHeight: '0' }}>
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
                        <span style={{ fontSize: '1.1rem' }}>{dayNumber || ''}</span>
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
  onAddRoutine, 
  onToggleRoutine, 
  onDeleteRoutine 
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newRoutine, setNewRoutine] = useState<string>('');

  const handleSubmit = (): void => {
    if (newRoutine.trim()) {
      onAddRoutine(newRoutine.trim());
      setNewRoutine('');
      setShowModal(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: '1', overflowY: 'auto', marginBottom: '1rem' }}>
        {selectedDate ? (
          <Form>
            {routines.map((routine, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                <Form.Check 
                  type="checkbox"
                  id={`routine-${index}`}
                  label={routine.text}
                  checked={routine.completed}
                  onChange={() => onToggleRoutine(index)}
                  className="text-white flex-grow-1"
                  style={{ fontSize: '1.1rem', paddingRight: '1rem' }}
                />
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDeleteRoutine(index)}
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            ))}
          </Form>
        ) : (
          <p className="text-white">Select a day to see routines</p>
        )}
      </div>

      <Button 
        variant="outline-light" 
        className="w-100" 
        onClick={() => setShowModal(true)}
        size="lg"
      >
        <i className="bi bi-plus-lg me-2"></i>
        Add New Routine
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Enter new routine"
            value={newRoutine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRoutine(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Routine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarPage;