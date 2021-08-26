import axios from 'axios';
import { API_ENDPOINT } from '@config';

export async function fetchCategories() {
  const url = API_ENDPOINT + `/api/v1/categories`;
  const result = await axios.get(url);
  return result.data;
}
