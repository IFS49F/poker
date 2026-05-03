import { forwardRef, type ReactNode } from "react";
import classNames from "classnames";
import "./SpeechBallon.css";

type SpeechBallonProps = {
  children: ReactNode;
  color: string;
};

const SpeechBallon = forwardRef<HTMLQuoteElement, SpeechBallonProps>(({ children, color }, ref) => {
  const speechBallonClass = classNames("SpeechBallon", color);

  return (
    <blockquote className={speechBallonClass} ref={ref}>
      {children}
    </blockquote>
  );
});

export default SpeechBallon;
