import styled from '@lib/styled-components';
import { IBoard } from '@types';
import { useState, useCallback, MouseEventHandler } from 'react';

interface BoardProps {
  board: IBoard;
}

export default function Table({ board }: BoardProps) {
  const [active, setActive] = useState<number>(-1);

  const activeHandler: MouseEventHandler = useCallback(
    ({ currentTarget }) => {
      const activeElem = currentTarget as HTMLElement;
      const idx = activeElem.dataset.idx;
      if (idx === undefined) return;
      const nextActive = active === +idx ? -1 : +idx;
      setActive(nextActive);
    },
    [active],
  );

  const getDateString = useCallback((rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear().toString().substr(2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }, []);

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
            <li className={'board__content' + (idx === active ? ' active' : '')} key={`${post.title}-${post.id}`}>
              <div data-idx={idx} onClick={activeHandler} className="board__content--header">
                <p>{post.id}</p>
                <p>{post.title}</p>
                <p>{post.user.name}</p>
                <p className="board__content--date">{getDateString(post.date)}</p>
              </div>
              <div className="board__content--content">
                <p className="board__content--title">{post.title}</p>
                <p>{post.content}</p>
                {board.slug === 'question' &&
                  (post.comments && post.comments.length ? (
                    <p>{post.comments[0].content}</p>
                  ) : (
                    <p>답변을 대기중입니다..</p>
                  ))}
              </div>
            </li>
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
  .board__content--header,
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
  .board__content {
    &:nth-child(n + 2) {
      border-top: 1px solid #ddd;
    }
  }
  .board__content--header {
    color: #555;
    > p:nth-child(2) {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover {
      cursor: pointer;
      background-color: #fafaf7;
    }
  }
  .board__content--content {
    display: none;
    padding: 1rem;
    overflow: hidden;
    background-color: #fafaf7;
    transition: 0.5s;
    border-top: 1px dashed #ddd;
    .board__content--title {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    > p:nth-child(3) {
      padding: 0.5rem;
      background-color: #eee;
      border-radius: 6px;
      margin-top: 1rem;
    }
  }
  .active {
    .board__content--header {
      background-color: #fafaf7;
    }
    .board__content--content {
      display: block;
    }
  }
  .board__content--empty {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 7rem;
    text-align: center;
    margin: 0.5em 0;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 0.8rem !important;
    .board__content--header,
    .board__header {
      grid-gap: 0.5rem;
      grid-template-columns: 2fr 1fr 1fr;
      > p:nth-child(1) {
        display: none;
      }
    }
    .board__content--title {
      font-size: 1rem !important;
    }
    .board__content--date {
      font-size: 0.7rem !important;
    }
  }
`;
