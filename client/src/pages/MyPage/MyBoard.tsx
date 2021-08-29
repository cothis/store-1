import styled from '@lib/styled-components';
import { useMyBoard } from '@hooks/query/board';
import Loading from '@components/Loading';
import axios from 'axios';
import notify from '@utils/toastify';
import { LOGIN_REQUIRED } from '@constants/message';
import Redirect from '@lib/router/Redirect';
import usePath from '@hooks/usePath';
import Pagination from '@components/Pagination';
import Board from '@components/MyPage/Board';

export default function MyBoard() {
  const path = usePath();
  const page = +path.search.page || 1;
  const type = path.pathname === '/my-page/review' ? 'reviews' : 'questions';
  const { isLoading, data, isError, error } = useMyBoard(type, page);
  const header = path.pathname === '/my-page/review' ? '내 상품 후기' : '내 상품 문의';

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notify('error', LOGIN_REQUIRED);
      return <Redirect to={{ pathname: '/signin', search: { redirect: path.pathname } }} />;
    }
    throw error;
  }

  return (
    <MyBoardPage>
      <h2>{header}</h2>
      <div className="mypage__board">{data && <Board board={data} type={type} />}</div>
      {data && <Pagination path={path} currentPage={page} link totalPage={data.totalPage} />}
    </MyBoardPage>
  );
}

const MyBoardPage = styled.div`
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 0 auto;
  padding: 1rem;
  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1em 0;
  }
  .mypage__board {
    width: 100%;
    border-radius: 6px;
  }
`;
