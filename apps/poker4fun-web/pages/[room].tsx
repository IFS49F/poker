import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Room: NextPage = () => {
  const router = useRouter();
  const { room } = router.query;

  return <>{room}</>;
};

export default Room;
