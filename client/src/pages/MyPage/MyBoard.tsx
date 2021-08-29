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
import { TitleWithBorder } from './my-page-style';

export default function MyBoard() {
  const path = usePath();
  const page = +path.search.page || 1;
  const type = path.pathname === '/my-page/review' ? 'reviews' : 'questions';
  const { isLoading, data, isError, error } = useMyBoard(type, page);
  const header = path.pathname === '/my-page/review' ? '내 상품 후기' : '내 상품 문의';

  if (isLoading) {
    return (
      <MyBoardPage>
        <TitleWithBorder>{header}</TitleWithBorder>
        <Loading />
      </MyBoardPage>
    );
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
      <TitleWithBorder>{header}</TitleWithBorder>
      {data && data.contents.length === 0 ? (
        <p className="mypage__board--empty">텅</p>
      ) : (
        <>
          <div className="mypage__board">{data && <Board board={data} type={type} />}</div>
          {data && <Pagination path={path} currentPage={page} link totalPage={data.totalPage} />}{' '}
        </>
      )}
    </MyBoardPage>
  );
}

const MyBoardPage = styled.div`
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 0 auto;
  padding: 0.5rem;

  .mypage__board {
    width: 100%;
    border-radius: 6px;
  }
  .mypage__board--empty {
    font-family: 'Do Hyeon', 'sans-serif';
    font-size: 7rem;
    margin: 0.5em 0;
    text-align: center;
  }
`;
