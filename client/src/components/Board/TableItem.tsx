import styled from '@lib/styled-components';
import { useCallback } from 'react';
import { IBoardContent, User } from '@types';
import useParams from '@hooks/useParams';
import { useBoardDelete } from '@hooks/query/board';
import notify from '@utils/toastify';
import { DELETE_SUCCESS } from '@constants/message';
import { useQueryClient } from 'react-query';

interface ITableItemProps {
  idx: number;
  active: number;
  post: IBoardContent;
  activeHandler: (idx: number) => void;
  slug: string;
  user: User | undefined;
  setModify: (value: string) => void;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setModal: (value: boolean) => void;
}

export default function TableItem({
  idx,
  active,
  post,
  activeHandler,
  slug,
  user,
  setModify,
  setContent,
  setTitle,
  setModal,
}: ITableItemProps) {
  const queryClient = useQueryClient();
  const param = useParams();
  const productId = post.product ? post.product.id : param.id;
  const type = slug === 'review' ? 'reviews' : 'questions';

  const { mutate: postDelete, isLoading } = useBoardDelete(productId, post.id, type);

  const modifyHandler = () => {
    setTitle(post.title);
    setContent(post.content);
    setModify(post.id);
    setModal(true);
  };
  const deleteHandler = () => {
    postDelete(null, {
      onSuccess: () => {
        notify('dark', DELETE_SUCCESS);
        queryClient.invalidateQueries(type);
        queryClient.invalidateQueries(`my-${type}`);
        activeHandler(-1);
      },
      onError: () => {
        notify('error', '삭제에 실패하였습니다');
      },
    });
  };

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
        {user && post.user.id === user.id && (
          <div className="board__content--btns">
            <button className="board__content--modify" onClick={modifyHandler}>
              수정
            </button>
            <button className="board__content--delete" onClick={deleteHandler} disabled={isLoading}>
              삭제
            </button>
          </div>
        )}
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
    position: relative;
    display: none;
    padding: 1rem;
    overflow: hidden;
    background-color: #fafaf7;
    transition: 0.5s;
    border-top: 1px dashed #ddd;
    .board__content--btns {
      position: absolute;
      top: 1rem;
      right: 1rem;
      > button {
        padding: 0.5em;
        border-radius: 6px;
        color: white;
      }
      .board__content--modify {
        background-color: ${({ theme }) => theme.color.yellow};
        margin-right: 0.5em;
      }
      .board__content--delete {
        background-color: ${({ theme }) => theme.color.red};
      }
    }
    .board__content--title {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    > p:nth-of-type(3) {
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
