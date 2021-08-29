import styled from '@lib/styled-components';
import { IBoard } from '@types';
import { useState, useCallback, MouseEventHandler } from 'react';
import TableItem from './TableItem';

interface BoardProps {
  board: IBoard;
}

export default function Table({ board }: BoardProps) {
  const [active, setActive] = useState<number>(-1);

  const activeHandler = useCallback(
    (idx: number) => {
      const nextActive = active === idx ? -1 : idx;
      setActive(nextActive);
    },
    [active],
  );

  return (
    <BoardTable>
      <div className="board__header">
        <p>번호</p>
        <p>제목</p>
        <p>작성자</p>
        <p>작성일</p>
      </div>
      {board.contents.length === 0 ? (
        <p className="board__content--empty">텅</p>
      ) : (
        <ul>
          {board.contents.map((post, idx) => (
            <TableItem
              key={`${post.title}-${post.id}`}
              post={post}
              idx={idx}
              active={active}
              activeHandler={activeHandler}
              slug={board.slug}
            />
          ))}
        </ul>
      )}
    </BoardTable>
  );
}

const BoardTable = styled.div`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 20px;
  .board__header {
    padding: 1rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 4fr 1fr 1fr;
  }
  .board__header {
    background-color: ${({ theme }) => theme.color.baeminPrimary};
    color: white;
  }
  .board__content--empty {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 7rem;
    text-align: center;
    margin: 0.5em 0;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 0.8rem !important;
    .board__header {
      grid-gap: 0.5rem;
      grid-template-columns: 2fr 1fr 1fr;
      > p:nth-child(1) {
        display: none;
      }
    }
  }
`;
