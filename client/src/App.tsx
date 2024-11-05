import React from 'react';
import logo from './logo.svg';
import './App.css';
import CheckList from './pages/Checklist';

function App() {
  return (
    <div className="App" style={{backgroundColor: 'bisque', minHeight: '100vh', minWidth: '100vh'}}>
      <CheckList/>
    </div>
  );
}

export default App;
