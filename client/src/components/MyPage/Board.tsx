import styled from '@lib/styled-components';
import { IBoard } from '@types';
import TableItem from '@components/Board/TableItem';
import Modal from '@components/Board/Modal';
import { useCallback, useState } from 'react';
import BoardProduct from './BoardProduct';
import { useUser } from '@hooks/query/users';
import useModal from '@hooks/useModal';

interface IMyBoardProps {
  board: IBoard;
  type: 'reviews' | 'questions';
}

export default function Board({ board, type }: IMyBoardProps) {
  const { data: user } = useUser();
  const [active, setActive] = useState<number>(-1);
  const [defaultTitle, setDefaultTitle] = useState<string>('');
  const [defaultContent, setDefaultContent] = useState<string>('');
  const [modify, setModify] = useState<string>('');
  const [modal, setModal] = useModal();
  const activeHandler = useCallback(
    (idx: number) => {
      const nextActive = active === idx ? -1 : idx;
      setActive(nextActive);
    },
    [active],
  );
  const header = type === 'reviews' ? '내 리뷰' : '내 문의';
  return (
    <MyBoardList>
      {board.contents.map((post, idx) => (
        <div className="myboard__content" key={`myboard-${board.slug}-${post.id}`}>
          <BoardProduct product={post.product!} />
          <TableItem
            activeHandler={activeHandler}
            active={active}
            idx={idx}
            post={post}
            slug={board.slug}
            user={user}
            setModify={setModify}
            setTitle={setDefaultTitle}
            setContent={setDefaultContent}
            setModal={setModal}
          />
          {modal && modify === post.id && (
            <Modal
              modal={modal}
              setModal={setModal}
              id={post.id}
              modify={modify}
              defaultContent={defaultContent}
              defaultTitle={defaultTitle}
              header={header}
              type={type}
              setPage={(_) => {}}
            />
          )}
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
