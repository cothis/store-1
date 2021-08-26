import { API_ENDPOINT } from '@config';
import { Term } from '@types';
import axios from 'axios';

export async function fetchTerm(term: Term): Promise<string> {
  const res = await axios.get(API_ENDPOINT + '/api/v1' + term);
  return res.data;
}
