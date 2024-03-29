import axios from '@utils/axios';
import { QueryFunctionContext } from 'react-query';
import { IBoardPostBody } from '@types';

type BoardType = 'notice' | 'reviews' | 'questions';

type INoticeKey = [
  BoardType,
  {
    page: number;
    onePageCount: number;
    id?: string;
  },
];

type MyBoardKey = [
  string,
  {
    page: number;
    type: BoardType;
  },
];

export async function fetchBoard({ queryKey }: QueryFunctionContext) {
  const [key, { id, page, onePageCount }] = queryKey as INoticeKey;
  const url =
    '/api/v1' +
    (key === 'notice' ? `/boards/notice` : `/products/${id}/${key}`) +
    `?page=${page}&onePageCount=${onePageCount}`;

  const result = await axios.get(url);

  return result.data;
}

export async function fetchMyBoard({ queryKey }: QueryFunctionContext) {
  const [_key, { page, type }] = queryKey as MyBoardKey;
  const url = `/api/v1/users/me/${type}?page=${page}&onePageCount=5`;

  const result = await axios.get(url);
  return result.data;
}

export async function fetchPostBoard(id: string, type: BoardType, body: IBoardPostBody) {
  const url = `/api/v1/products/${id}/${type}`;

  const result = await axios.post(url, body);
  return result;
}

export async function fetchPutBoard(productsId: string, postId: string, type: BoardType, body: IBoardPostBody) {
  const url = `/api/v1/products/${productsId}/${type}/${postId}`;

  const result = await axios.put(url, body);
  return result;
}

export async function fetchDeleteBoard(productsId: string, postId: string, type: BoardType) {
  const url = `/api/v1/products/${productsId}/${type}/${postId}`;

  const result = await axios.delete(url);
  return result;
}
