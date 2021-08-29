import { ProductListPage, Term, User } from '@types';
import axios from '@utils/axios';

export async function fetchTerm(term: Term): Promise<string> {
  const res = await axios.get('/api/v1' + term);
  return res.data;
}

export async function fetchUser(): Promise<User> {
  const res = await axios.get<User>('/api/v1/users/me');
  return res.data;
}

export function fetchLogout(): Promise<void> {
  return axios.get('/api/v1/auth/logout');
}

export async function fetchUserLikes(page: number): Promise<ProductListPage> {
  const res = await axios.get<ProductListPage>(`/api/v1/users/me/likes?page=${page}`);
  return res.data;
}
