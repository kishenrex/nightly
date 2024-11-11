import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";
import ChecklistPage from './pages/Checklist';
import LandingPage from "./pages/LandingPage";


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

 export default App;
