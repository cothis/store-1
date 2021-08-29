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

export async function fetchBoard({ queryKey }: QueryFunctionContext) {
  const [key, { id, page, onePageCount }] = queryKey as INoticeKey;
  const url =
    '/api/v1' +
    (key === 'notice' ? `/boards/notice` : `/products/${id}/${key}`) +
    `?page=${page}&onePageCount=${onePageCount}`;

  const result = await axios.get(url);

  return result.data;
}

export async function fetchPostBoard(id: string, type: BoardType, body: IBoardPostBody) {
  const url = `/api/v1/products/${id}/${type}`;

  const result = await axios.post(url, body);
  return result;
}
