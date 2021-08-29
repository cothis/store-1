import styled from '@lib/styled-components';
import { useCallback } from 'react';
import { IBoardContent } from '@types';

interface ITableItemProps {
  idx: number;
  active: number;
  post: IBoardContent;
  activeHandler: (idx: number) => void;
  slug: string;
}

export default function TableItem({ idx, active, post, activeHandler, slug }: ITableItemProps) {
  const getDateString = useCallback((rawDate) => {
    const date = new Date(rawDate);
    return `${date.getFullYear().toString().substr(2)}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }, []);
  return (
    <Item className={idx === active ? ' active' : ''}>
      <div data-idx={idx} onClick={() => activeHandler(idx)} className="board__content--header">
        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.user.name}</p>
        <p className="board__content--date">{getDateString(post.date)}</p>
      </div>
      <div className="board__content--content">
        <p className="board__content--title">{post.title}</p>
        <p>{post.content}</p>
        {slug === 'question' &&
          (post.comments && post.comments.length ? <p>{post.comments[0].content}</p> : <p>답변을 대기중입니다..</p>)}
      </div>
    </Item>
  );
}

const Item = styled.li`
  &:nth-child(n + 2) {
    border-top: 1px solid #ddd;
  }
  .board__content--header {
    padding: 1rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 4fr 1fr 1fr;
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
  &.active {
    .board__content--header {
      background-color: #fafaf7;
    }
    .board__content--content {
      display: block;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .board__content--header {
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
