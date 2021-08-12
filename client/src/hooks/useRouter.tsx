import { RouterContext } from '@context';
import { useContext } from 'react';

const useRouter = () => {
  const { path } = useContext(RouterContext);
  return path;
};

export default useRouter;
