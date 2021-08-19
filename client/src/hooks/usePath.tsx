import { RouterContext } from '@context';
import { useContext } from 'react';

export default function usePath() {
  return useContext(RouterContext).path;
}
