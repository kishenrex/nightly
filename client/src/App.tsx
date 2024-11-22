import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ChecklistPage from './pages/Checklist';
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';
import AvatarPage from './pages/AvatarPage';
import Settings from './pages/Settings/Settings';
import { AvatarProvider } from './context/AvatarContext';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';

const App = () => {
  return (
    <div>
      <ThemeProvider>
      <TimerProvider>
      <AvatarProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/checklist/" element={<ChecklistPage />} />
        <Route path="/timer/" element={<TimerPage />} />
        <Route path="/avatars" element={<AvatarPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>     
      </AvatarProvider>   
      </TimerProvider>
      </ThemeProvider>
    </div>
  );
 };

 export default App;