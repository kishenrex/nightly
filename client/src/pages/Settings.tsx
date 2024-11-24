import React, { useContext } from 'react';
import HomeButton from '../components/HomeButton';
import { ThemeContext } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.background, }}>
     <div style={{ 
        display: 'flex', 
        justifyContent: 'right', 
        alignItems: 'right', 
        padding: '20px'
        }}>
        <HomeButton></HomeButton>
      </div>

    <div style= {{ backgroundColor: theme.background, color: theme.fontColor }}className="settings-container">
      <h1 style= {{ backgroundColor: theme.background, color: theme.fontColor }}className="settings-title">Settings</h1>
      
      <div className="settings-option">
        <div>
          <span id="desktop-label">Desktop Notification Preferences</span>
          <p style= {{  color: theme.fontColor_sub }}className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="desktop-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="text-label">Text Notification Preferences</span>
          <p style= {{  color: theme.fontColor_sub }} className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="text-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="theme-label">Auto-change Theme based on Time</span>
          <p style= {{  color: theme.fontColor_sub }} className="description">Day/Night</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="theme-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="gamification-label">Toggle Gamification</span>
          <p style= {{  color: theme.fontColor_sub }} className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="gamification-label" />
          <span className="slider"></span>
        </label>
      </div>
    </div>
          
    </div>
  );
};

export default Settings;
