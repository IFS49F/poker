import React from 'react';
import classNames from 'classnames';
import './SpeechBallon.css';

const SpeechBallon = ({ children, color }) => {
  const speechBallonClass = classNames('SpeechBallon', color);

  return (
    <blockquote className={speechBallonClass}>
      {children}
    </blockquote>
  );
};

export default SpeechBallon;
