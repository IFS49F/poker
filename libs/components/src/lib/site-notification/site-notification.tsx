import { useEffect, useState } from 'react';
import styles from './site-notification.module.css';

export const CONTENT_URL = '/site-notification.html' as const;
export const DISMISS_COOKIE_KEY = 'site-notification-dismissed' as const;
const DATE_ISSUED_REGEX = /--data-date-issued="([^"]+)"/;

export const SiteNotification = () => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(CONTENT_URL)
      .then((resp) => resp.text())
      .then(loadContent);
  }, []);

  function loadContent(content: string) {
    const match = DATE_ISSUED_REGEX.exec(content);
    const issuedTime = match !== null ? match[1] : null;

    const dismissTime = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${DISMISS_COOKIE_KEY}=`))
      ?.split('=')[1];

    if (issuedTime && dismissTime) {
      if (~~issuedTime > ~~dismissTime) {
        setContent(content);
      }
    } else {
      setContent(content);
    }
  }

  function onDismiss() {
    document.cookie = `${DISMISS_COOKIE_KEY}=${Date.now()} ;path=/ ;max-age=604800`;
    setContent(null);
  }

  return content ? (
    <div className={styles['container']} role="banner">
      <button onClick={onDismiss} aria-label="dismiss">
        <svg
          viewBox="0 0 1024 1024"
          fill="#000000"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
              fill=""
            ></path>
            <path
              d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
              fill=""
            ></path>
          </g>
        </svg>
      </button>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  ) : null;
};

export default SiteNotification;
