import { BoardType } from '@types';
import { useBoard } from '@hooks/query/board';
import { useState } from 'react';
import Loading from '@components/Loading';
import Pagination from '@components/Pagination';
import Modal from './Modal';
import Table from './Table';
import usePath from '@hooks/usePath';
import styled from '@lib/styled-components';
interface IBoardProps {
  header: string;
  type: BoardType;
  id?: string;
  login?: boolean;
}
export default function Board({ header, type, id, login }: IBoardProps) {
  const [page, setPage] = useState<number>(1);
  const path = usePath();

  const { isLoading, data, isError } = useBoard(type, page, id);

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
        {type !== 'notice' && id && <Modal id={id} header={header} type={type} setPage={setPage} login={login} />}
      </div>
      {!isLoading && data ? <Table board={data} /> : <Loading />}
      {data && data.contents.length >= 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPage={data.totalPage}
          path={path}
          link={false}
          setPage={setPage}
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
