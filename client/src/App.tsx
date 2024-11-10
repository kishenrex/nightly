import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import TimerPage from './pages/TimerPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/timer/" element={<TimerPage />} />
        <Route path="/home/" />
      </Routes>
    </div>
  );
 };

 export default App;