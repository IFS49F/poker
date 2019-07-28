import React from 'react';
import classNames from 'classnames';
import './SiteNotification.css';

const SiteNotification = () => {
  const expiryDate = new Date(process.env.REACT_APP_DOMAIN_EXPIRY_DATE);
  const today = new Date();
  const isUrgent = ((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 90
  const expiryDateClasses = classNames({
    'expiry-date': true,
    'expiry-date--close': isUrgent
  });

  return (
    <div className="SiteNotification">
      <p>
        Poker4Fun costs <a href="https://github.com/IFS49F/poker/#cost">USD $90</a> to run every year.
      </p>
      <p>
        Currently the domain is available until <span className={expiryDateClasses}>{process.env.REACT_APP_DOMAIN_EXPIRY_DATE}</span>.
      </p>
      <p>
        Please <a href="https://github.com/IFS49F/poker#donate" target="_blank" rel="noopener noreferrer">help us</a> keeping Poker4Fun free and sustainable.
      </p>
    </div>
  );
};

export default SiteNotification;
