import { useQuery, useMutation } from 'react-query';
import { BoardType, IBoard, IBoardPostBody } from '@types';
import { fetchBoard, fetchPostBoard } from '@utils/board';

export function useBoard(type: BoardType, page: number, id?: string) {
  const onePageCount = type === 'notice' ? 10 : 5;
  return useQuery<IBoard, Error>([type, { id, page, onePageCount }], fetchBoard);
}

export function useBoardPost(id: string, type: BoardType) {
  return useMutation((body: IBoardPostBody) => fetchPostBoard(id, type, body), { retry: false });
}
