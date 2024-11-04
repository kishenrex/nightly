import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <div>
      <h1>Nightly</h1>
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
      </Routes>
    </div>
  );
 };

 export default App;
