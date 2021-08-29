import { BoardType, User } from '@types';
import { useBoard } from '@hooks/query/board';
import useModal from '@hooks/useModal';
import { useState, useCallback, useEffect } from 'react';
import Loading from '@components/Loading';
import Pagination from '@components/Pagination';
import Modal from './Modal';
import Table from './Table';
import usePath from '@hooks/usePath';
import styled from '@lib/styled-components';
import useHistory from '@hooks/useHistory';
import notify from '@utils/toastify';
import { LOGIN_REQUIRED } from '@constants/message';
interface IBoardProps {
  header: string;
  type: BoardType;
  id?: string;
  user: User | undefined;
}

export default function Board({ header, type, id, user }: IBoardProps) {
  const [page, setPage] = useState<number>(1);
  const [modify, setModify] = useState<string>('');
  const [defaultTitle, setDefaultTitle] = useState<string>('');
  const [defaultContent, setDefaultContent] = useState<string>('');
  const [modal, setModal] = useModal();
  const path = usePath();
  const history = useHistory();

  const { isLoading, data, isError } = useBoard(type, page, id);

  useEffect(() => {
    if (!modal) setModify('');
  }, [modal]);

  const buttonClickHandler = useCallback(() => {
    if (!user) {
      notify('warning', LOGIN_REQUIRED);
      history.replace({ pathname: '/signin', search: { redirect: `/products/${id}` } });
      return;
    }
    setModal(true);
  }, [modal, user]);

  if (isError) {
    return (
      <p
        style={{
          textAlign: 'center',
          fontFamily: `'Do Hyeon', 'sans-serif'`,
          fontSize: '3rem',
        }}
      >
        앗, 알 수 없는 에러닷..
      </p>
    );
  }

  return (
    <BoardWrapper>
      <div className="board-header">
        <h4>{header}</h4>
        <button onClick={buttonClickHandler}>작성하기</button>
      </div>
      {!isLoading && data ? (
        <Table
          board={data}
          user={user}
          setModify={setModify}
          setTitle={setDefaultTitle}
          setContent={setDefaultContent}
          setModal={setModal}
        />
      ) : (
        <Loading />
      )}
      {data && data.contents.length >= 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPage={data.totalPage}
          path={path}
          link={false}
          setPage={setPage}
        />
      )}
      {type !== 'notice' && id && modal && (
        <Modal
          id={id}
          header={header}
          type={type}
          setPage={setPage}
          modal={modal}
          setModal={setModal}
          modify={modify}
          defaultTitle={defaultTitle}
          defaultContent={defaultContent}
        />
      )}
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  .board-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h4 {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 1em 0;
    }
    > button {
      padding: 0.5em;
      color: white;
      background-color: ${({ theme }) => theme.color.baeminPrimary};
      border-radius: 6px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
