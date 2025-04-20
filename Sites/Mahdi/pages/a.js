import { useEffect } from 'react';
import { useRouter } from 'next/router';

const A = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the desired route
    router.push('/privatenote/diary');
  }, [router]); // Dependency array includes router

  return <div></div>;
};

export default A;
