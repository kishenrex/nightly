import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/timer/" element={<TimerPage />} />
        <Route path="/login/"  />
      </Routes>
    </div>
  );
 };

 export default App;