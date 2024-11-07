import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
      </Routes>
    </div>
  );
 };

 export default App;
