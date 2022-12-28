import React, { useEffect, useState } from 'react';
import styles from './share.module.css';

type Method = 'share' | 'copy' | 'unsupported';

type Tooltip = `Click to ${Method} link` | 'Copied!';

export type ShareProps = {
  roomName: string;
};

export const Share = ({ roomName }: ShareProps) => {
  const caption = `${window.location.host}/${roomName}`;
  const title = `${roomName} ♠︎ Poker4Fun`;
  const url = `${window.location.protocol}//${window.location.host}/${roomName}`;
  const [method, setMethod] = useState<Method>('share');
  const [tooltip, setTooltip] = useState<Tooltip>();

  useEffect(() => {
    if ('share' in navigator) {
      setMethod('share');
      setTooltip('Click to share link');
    } else if ('clipboard' in navigator) {
      setMethod('copy');
      setTooltip('Click to copy link');
    }
  }, []);

  const handleClick: Record<
    Method,
    (e: React.MouseEvent<HTMLAnchorElement>) => Promise<void>
  > = {
    async share(e) {
      e.preventDefault();
      try {
        await navigator.share({ title, url });
      } catch (_) {
        // ignore cancelled sharing
      }
    },
    async copy(e) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(url);
        setTooltip('Copied!');
      } catch (_) {
        // ignore no permission
      }
    },
    async unsupported(e) {
      e.preventDefault();
    },
  };

  const handleMouseLeave = () => {
    setTooltip(
      method === 'unsupported' ? undefined : `Click to ${method} link`
    );
  };

  return (
    <div className={styles['container']}>
      <h1>
        Poker4<strong>Fun</strong>
      </h1>
      <a
        href={url}
        onClick={handleClick[method]}
        onMouseLeave={handleMouseLeave}
        aria-label={tooltip}
      >
        {caption}
      </a>
    </div>
  );
};

export default Share;
