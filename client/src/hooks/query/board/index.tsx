import { useQuery, useMutation } from 'react-query';
import { BoardType, IBoard, IBoardPostBody } from '@types';
import { fetchBoard, fetchPostBoard, fetchMyBoard, fetchPutBoard, fetchDeleteBoard } from '@utils/board';

export function useBoard(type: BoardType, page: number, id?: string) {
  const onePageCount = type === 'notice' ? 10 : 5;
  return useQuery<IBoard, Error>([type, { id, page, onePageCount }], fetchBoard);
}

export function useMyBoard(type: BoardType, page: number) {
  return useQuery<IBoard, Error>([`my-${type}`, { page, type }], fetchMyBoard);
}

export function useBoardPost(id: string, type: BoardType) {
  return useMutation((body: IBoardPostBody) => fetchPostBoard(id, type, body), { retry: false });
}

export function useBoardPut(productsId: string, postId: string, type: BoardType) {
  return useMutation((body: IBoardPostBody) => fetchPutBoard(productsId, postId, type, body), { retry: false });
}

export function useBoardDelete(productsId: string, postId: string, type: BoardType) {
  return useMutation((_?: unknown) => fetchDeleteBoard(productsId, postId, type), { retry: false });
}
