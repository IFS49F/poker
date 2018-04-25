import React from 'react';
import classNames from 'classnames';
import './Notification.css';

const Notification = ({ active, reconnCountdown, onReconn }) => {
  const notificationClass = classNames('Notification', { active });

  return (
    <div className={notificationClass}>
      <span>Your seems offline, </span>
      <span className="countdown">we will try reconnecting in {reconnCountdown}s... </span>
      <a href="#reconnect" onClick={onReconn}>Reconnect Now</a>
    </div>
  );
};

export default Notification;
