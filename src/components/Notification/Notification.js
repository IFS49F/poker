import React from 'react';
import './Notification.css';

const Notification = ({ reconnCountdown, onReconn }) => {
  return (
    <div className="Notification">
      <span>Your seems offline, </span>
      <span className="countdown">we will try reconnecting in {reconnCountdown}s... </span>
      <a href="#reconnect" onClick={onReconn}>Reconnect Now</a>
    </div>
  );
};

export default Notification;
