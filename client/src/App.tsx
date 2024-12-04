import './App.css';
import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';
import AvatarPage from './pages/AvatarPage';
import { AvatarProvider } from './context/AvatarContext';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <div>
      <UserProvider>
      <ThemeProvider>
      <TimerProvider>
      <AvatarProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="/timer/" element={<TimerPage />} />
        <Route path="/avatars" element={<AvatarPage />} />
      </Routes>     
      </AvatarProvider>   
      </TimerProvider>
      </ThemeProvider>
      </UserProvider>
    </div>
  );
 };

 export default App;