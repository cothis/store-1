import { HistoryContext } from '@context';
import { useContext } from 'react';

const useHistory = () => {
  const { history } = useContext(HistoryContext);
  return history;
};

export default useHistory;
