import styled from '@lib/styled-components';
import { IMyBoard } from '@types';
import TableItem from '@components/Board/TableItem';
import { useCallback, useState } from 'react';
import BoardProduct from './BoardProduct';

interface IMyBoardProps {
  board: IMyBoard;
}

export default function Board({ board }: IMyBoardProps) {
  const [active, setActive] = useState<number>(-1);
  const activeHandler = useCallback(
    (idx: number) => {
      const nextActive = active === idx ? -1 : idx;
      setActive(nextActive);
    },
    [active],
  );

  return (
    <MyBoardList>
      {board.contents.map((post, idx) => (
        <div className="myboard__content" key={`myboard-${board.slug}-${post.id}`}>
          <BoardProduct product={post.product} />
          <TableItem activeHandler={activeHandler} active={active} idx={idx} post={post} slug={board.slug} />
        </div>
      ))}
    </MyBoardList>
  );
}

const MyBoardList = styled.ul`
  .myboard__content {
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
    border-radius: 6px;
    background-color: white;
    overflow: hidden;
    &:nth-child(n + 2) {
      margin-top: 1rem;
    }
  }
`;
