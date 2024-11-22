import React from 'react';
import '../styles/Settings.css';

const Settings: React.FC = () => {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-option">
        <div>
          <span id="desktop-label">Desktop Notification Preferences</span>
          <p className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="desktop-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="text-label">Text Notification Preferences</span>
          <p className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="text-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="theme-label">Auto-change Theme based on Time</span>
          <p className="description">Day/Night</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="theme-label" />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="settings-option">
        <div>
          <span id="gamification-label">Toggle Gamification</span>
          <p className="description">On/Off</p>
        </div>
        <label className="switch">
          <input type="checkbox" aria-labelledby="gamification-label" />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
