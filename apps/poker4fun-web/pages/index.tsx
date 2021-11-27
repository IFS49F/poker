import { hri } from 'human-readable-ids';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';

const Index: NextPage = () => {
  const [randomRoomName, setRandomRoomName] = useState('');
  useEffect(() => {
    setRandomRoomName(hri.random());
  }, []);

  const router = useRouter();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      roomName: { value: string };
    };
    router.push(target.roomName.value || randomRoomName);
  }

  return (
    <div className="h-screen grid grid-rows-[1fr,auto,1fr,3rem] bg-landing bg-cover bg-center dark:bg-blend-multiply dark:bg-gray-500">
      <form
        onSubmit={handleSubmit}
        className="row-start-2 flex flex-col items-center gap-4 p-8 dark:text-white bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 backdrop-blur-xl backdrop-saturate-150 shadow-lg"
      >
        <h1 className="text-5xl font-thin">
          Poker4<strong className="font-semibold">Fun</strong>
        </h1>
        <label>
          {`${process.env.NEXT_PUBLIC_DOMAIN} / `}
          <input
            type="text"
            autoFocus={true}
            name="roomName"
            placeholder={randomRoomName}
            pattern="[a-zA-Z0-9-_]+"
            className="w-[200px] bg-transparent border-0 border-b-current border-b-2 outline-none text-center"
          />
        </label>
        <button
          type="submit"
          className="leading-10 px-4 text-white bg-blue-600 rounded-lg transition-transform hover:scale-110 active:scale-105"
        >
          Start or Join a session
        </button>
      </form>
      <div className="row-start-4 text-center">
        <a
          href="https://unsplash.com/@bramnaus?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Bram Naus"
          className="inline-flex items-center px-2 gap-2 leading-6 text-xs font-semibold rounded bg-black text-white no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-3 h-3"
          >
            <path
              fill="currentColor"
              d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"
            ></path>
          </svg>
          Bram Naus
        </a>
      </div>
    </div>
  );
};

export default Index;
