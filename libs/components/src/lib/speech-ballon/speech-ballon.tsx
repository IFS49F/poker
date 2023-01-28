import classNames from 'classnames';
import type { ReactNode, PropsWithChildren } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './speech-ballon.module.css';

const PopIn = ({ children, ...props }: PropsWithChildren) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: styles['popIn-enter'],
      enterActive: styles['popIn-enter-active'],
      exit: styles['popIn-exit'],
      exitActive: styles['popIn-exit-active'],
    }}
    timeout={300}
  >
    {children}
  </CSSTransition>
);

export type SpeechBallonProps = {
  show: boolean;
  backgroundColor?: 'blue' | 'green' | 'red';
  children?: ReactNode;
};

export const SpeechBallon = ({
  show,
  backgroundColor = 'blue',
  children,
}: SpeechBallonProps) => (
  <TransitionGroup component={null}>
    {show && (
      <PopIn>
        <div
          className={classNames(styles['container'], styles[backgroundColor])}
          role="alert"
        >
          {children}
        </div>
      </PopIn>
    )}
  </TransitionGroup>
);

export default SpeechBallon;
