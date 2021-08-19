import { HistoryContext } from '@context';
import { useContext } from 'react';

export default function useHistory() {
  return useContext(HistoryContext);
}
