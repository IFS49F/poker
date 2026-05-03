import { forwardRef, type MouseEvent } from "react";
import "./Notification.css";

type NotificationProps = {
  reconnCountdown: number;
  onReconn: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ reconnCountdown, onReconn }, ref) => {
    return (
      <div className="Notification" ref={ref}>
        <span>You appear to be offline, </span>
        <span className="countdown">we will try reconnecting in {reconnCountdown}s... </span>
        <a href="#reconnect" onClick={onReconn}>
          Reconnect Now
        </a>
      </div>
    );
  },
);

export default Notification;
