import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ChecklistPage from './pages/Checklist';
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';
<<<<<<< HEAD
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';
=======
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ChecklistPage from './pages/Checklist';
>>>>>>> 18979bcb1aefc643b6b06257bbe7dfbad784e686

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/checklist/" element={<ChecklistPage />} />
      </Routes>
    </div>
  );
 };

<<<<<<< HEAD
 export default App;
=======
 export default App;
>>>>>>> 18979bcb1aefc643b6b06257bbe7dfbad784e686
