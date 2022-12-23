import { hri } from 'human-readable-ids';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form } from 'react-router-dom';
import styles from './landing.module.css';

export const Landing = () => {
  const { current: randomRoomName } = useRef(hri.random());

  return (
    <div className={styles['container']}>
      <Helmet>
        <title>Poker4Fun</title>
      </Helmet>
      <Form method="post">
        <h1>
          Poker4<strong>Fun</strong>
        </h1>
        <p>
          <label>{import.meta.env.VITE_APP_DOMAIN} /</label>
          <input
            type="text"
            name="roomName"
            placeholder={randomRoomName}
            autoFocus
          />
          <input type="hidden" name="randomRoomName" value={randomRoomName} />
        </p>
        <p>
          <button type="submit">Start or Join a session</button>
        </p>
      </Form>
      <div className={styles['unsplash-credit']}>
        <a
          href="https://unsplash.com/@bramnaus?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Bram Naus"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <title></title>
              <path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path>
            </svg>
          </span>
          <span>Bram Naus</span>
        </a>
      </div>
    </div>
  );
};

export default Landing;
