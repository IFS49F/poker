import React from 'react';
import classNames from 'classnames';
import './SpeechBallon.css';

const SpeechBallon = ({ children, ...props }) => {
  const { color } = props;
  const speechBallonClass = classNames('SpeechBallon', color);

  return (
    <blockquote className={speechBallonClass}>
      {children}
    </blockquote>
  );
};

export default SpeechBallon;
