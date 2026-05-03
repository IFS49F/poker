import classNames from "classnames";
import "./DonationBanner.css";

const DonationBanner = () => {
  const expiryDateStr = process.env.BUN_PUBLIC_DOMAIN_EXPIRY_DATE;

  if (!expiryDateStr) {
    return null;
  }

  const expiryDate = new Date(expiryDateStr);
  const today = new Date();
  const isUrgent = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) < 90;
  const expiryDateClasses = classNames({
    "expiry-date": true,
    urgent: isUrgent,
  });

  return (
    <div className="DonationBanner">
      <p>
        Poker4Fun costs <a href="https://github.com/IFS49F/poker/#cost">USD $90</a> to run every
        year.
      </p>
      <p>
        Currently the domain is available until{" "}
        <span className={expiryDateClasses}>{expiryDateStr}</span>.
      </p>
      <p>
        Please{" "}
        <a href="https://github.com/IFS49F/poker#donate" target="_blank" rel="noopener noreferrer">
          help us
        </a>{" "}
        keeping Poker4Fun free and sustainable.
      </p>
    </div>
  );
};

export default DonationBanner;
