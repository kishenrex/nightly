import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TimerPage from './pages/TimerPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/landing/" element={<LandingPage />} />
         <Route path="/timer/" element={<TimerPage />} />
      </Routes>
    </div>
  );
 };

 export default App;