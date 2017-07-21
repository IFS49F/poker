import React, { Component } from 'react';
import classNames from 'classnames';
import './Notification.css';

class Notification extends Component {
  render() {
    const { active, reconnCountdown, onReconn } = this.props;
    const notificationClass = classNames('Notification', { active });

    return (
      <div className={notificationClass}>
        <span>Your computer seems offline, we will try reconnecting in {reconnCountdown}s... </span>
        <a href="reconnect" onClick={onReconn}>Reconnect Now</a>
      </div>
    );
  }
}

export default Notification;
