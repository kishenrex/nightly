import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// TopRightGroup component
const TopRightGroup = () => {
  return (
    <div className="d-flex align-items-center gap-4">
      {/* Sleep Timer */}
      <Link 
        to="/timer" 
        className="text-white text-decoration-none"
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-clock fs-5"></i>
          <span>Sleep Timer</span>
        </div>
      </Link>

      {/* Current Streak */}
      <div className="text-white text-center border-start border-end px-3">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-fire"></i>
          <span>Current Streak</span>
        </div>
        <Badge bg="success" className="fs-6">100</Badge>
      </div>
      
      {/* User Profile and Theme */}
      <div className="d-flex align-items-center gap-3">
        <Link to="/profile" className="text-white">
          <i className="bi bi-person-circle" style={{ fontSize: '3.5rem' }}></i>
        </Link>
        <Button variant="outline-light" className="ms-2">
          <i className="bi bi-moon-stars"></i>
        </Button>
      </div>
    </div>
  );
};

// Main Calendar Page component
const CalendarPage = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#2d1b69' }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
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
            <TopRightGroup />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="p-4">
        <div className="d-flex gap-4">
          {/* Calendar Section */}
          <div className="flex-grow-1 bg-white rounded p-4 shadow" style={{ minHeight: '500px' }}>
            <h2 className="mb-4">
              <i className="bi bi-calendar3 me-2"></i>
              Calendar
            </h2>
            {/* Calendar content will go here */}
          </div>

          {/* Night Routine Section */}
          <div 
            className="rounded p-4 text-white shadow" 
            style={{ width: '320px', backgroundColor: '#1a103f' }}
          >
            <h2 className="mb-4">
              <i className="bi bi-moon-stars me-2"></i>
              Night Routine for the Day
            </h2>
            {/* Night routine content will go here */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CalendarPage;