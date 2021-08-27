import axios from '@utils/axios';

export async function fetchCategories() {
  const result = await axios.get('/api/v1/categories');
  return result.data;
}
