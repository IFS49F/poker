import React from 'react';
import classNames from 'classnames';
import './SiteNotification.css';

const SiteNotification = () => {
  const expiryDate = new Date(process.env.REACT_APP_DOMAIN_EXPIRY_DATE);
  const today = new Date();
  const isLessThanOneMonth = ((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) < 30
  const expiryDateClasses = classNames({
    'expiry-date': true,
    'expiry-date--close': isLessThanOneMonth
  });

  return (
    <div className="SiteNotification">
      <p>
        Poker4Fun costs US $60 for server and US $30 for domain every year.
      </p>
      <p>
        Currently the domain is available until <span className={expiryDateClasses}>{process.env.REACT_APP_DOMAIN_EXPIRY_DATE}</span>.
      </p>
      <p>
        Please click <a href="https://github.com/IFS49F/poker#donate" target="_blank" rel="noopener noreferrer">here</a> to help us keeping Poker4Fun free and sustainable.
      </p>
    </div>
  );
};

export default SiteNotification;
