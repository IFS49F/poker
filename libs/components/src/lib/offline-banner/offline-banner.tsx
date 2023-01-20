import type { PropsWithChildren } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './offline-banner.module.css';

type OfflineBannerProps = {
  show: boolean;
};

const SlideOut = ({ children, ...props }: PropsWithChildren) => (
  <CSSTransition
    {...props}
    timeout={200}
    classNames={{
      enter: styles['slideOut-enter'],
      enterActive: styles['slideOut-enter-active'],
      exit: styles['slideOut-exit'],
    }}
  >
    {children}
  </CSSTransition>
);

export const OfflineBanner = ({ show }: OfflineBannerProps) => (
  <TransitionGroup component={null}>
    {show && (
      <SlideOut>
        <div className={styles['container']}>
          <span role="img" aria-labelledby="offline-reconnecting">
            📶
          </span>
          <span id="offline-reconnecting">Reconnecting...</span>
        </div>
      </SlideOut>
    )}
  </TransitionGroup>
);

export default OfflineBanner;
