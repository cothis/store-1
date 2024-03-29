import styled from '@lib/styled-components';
import ExitBtn from '@components/ExitBtn';
import { useCallback, useState, FormEvent, useRef, useEffect } from 'react';
import { useBoardPost, useBoardPut } from '@hooks/query/board';
import { LOGIN_REQUIRED, INPUT_REQUIRED, SUCCESS_BOARD_POST, SUCCESS_BOARD_PUT } from '@constants/message';
import notify from '@utils/toastify';
import Redirect from '@lib/router/Redirect';
import Loading from '@components/Loading';
import axios from 'axios';
import { BoardType } from '@types';
import { useQueryClient } from 'react-query';

interface BoardModalProps {
  id: string;
  type: BoardType;
  header: string;
  modal: boolean;
  defaultTitle: string;
  defaultContent: string;
  modify: string;
  setModal: (value: boolean) => void;
  setPage: (page: number) => void;
}

export default function BoardModal({
  id,
  type,
  header,
  setPage,
  modal,
  setModal,
  modify,
  defaultTitle,
  defaultContent,
}: BoardModalProps) {
  const [title, setTitle] = useState<string>(modify.length ? defaultTitle : '');
  const [content, setContent] = useState<string>(modify.length ? defaultContent : '');

  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { isLoading: postLoading, isError: isPostError, error: postError, mutate: postMutate } = useBoardPost(id, type);
  const {
    isLoading: putLoading,
    isError: isPutError,
    error: putError,
    mutate: putMutate,
  } = useBoardPut(id, modify, type);

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title.length || !content.length) {
        notify('warning', INPUT_REQUIRED);
        return;
      }
      if (!modify.length) {
        postMutate(
          { title, content },
          {
            onSuccess: () => {
              notify('success', SUCCESS_BOARD_POST);
              setTitle('');
              setContent('');
              setPage(1);
              queryClient.invalidateQueries(type);
              setModal(false);
            },
          },
        );
      } else {
        putMutate(
          { title, content },
          {
            onSuccess: () => {
              notify('success', SUCCESS_BOARD_PUT);
              queryClient.invalidateQueries(type);
              queryClient.invalidateQueries(`my-${type}`);
              setModal(false);
            },
          },
        );
      }
    },
    [title, content],
  );

  useEffect(() => {
    if (modal) inputRef.current?.focus();
  }, [modal]);

  if (isPostError) {
    if (axios.isAxiosError(postError) && postError.response?.status === 401) {
      notify('error', LOGIN_REQUIRED);
      return <Redirect to={{ pathname: '/signin', search: { redirect: `/products/${id}` } }} />;
    }
    throw postError;
  }

  return (
    <>
      <ModalWrapper className={modal ? 'on' : ''}>
        <div
          onClick={() => {
            setModal(false);
          }}
          className="modal__background"
        ></div>
        <form className="modal__form" onSubmit={submitHandler}>
          <div className="modal__form--header">
            <p>{header + (modify.length > 0 ? ' 수정' : '')}</p>
            <ExitBtn
              absolute
              top="0"
              right="0"
              width="20px"
              height="20px"
              color="black"
              strokeWidth="6"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
          <label>
            제목
            <input
              ref={inputRef}
              type="text"
              name={`${type}-title`}
              id={`${type}-title`}
              value={title}
              onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => setTitle(currentTarget.value)}
            />
          </label>
          <label>
            내용
            <textarea
              name={`${type}-content`}
              id={`${type}-content`}
              value={content}
              onChange={({ currentTarget }: FormEvent<HTMLTextAreaElement>) => setContent(currentTarget.value)}
            />
          </label>
          <button type="submit">{modify.length > 0 ? '수정하기' : '작성하기'}</button>
          {(postLoading || putLoading) && (
            <div className="form__loading">
              <Loading />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  margin: 0 !important;
  &.on {
    display: block;
  }
  .modal__background {
    position: relative;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal__form {
    overflow-y: auto;
    position: absolute;
    z-index: 14;
    top: 50%;
    left: 50%;
    width: 50vw;
    max-width: 500px;
    min-width: 300px;
    background-color: white;
    border-radius: 10px;
    transform: translate3d(-50%, -50%, 0);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    > * {
      width: 100%;
    }
    .modal__form--header {
      position: relative;
      font-size: 1.2rem;
      font-weight: bold;
      padding-bottom: 0.5em;
      border-bottom: 1px solid #ddd;
    }
    > label {
      font-size: 1.1rem;
      font-weight: bold;
      > input,
      textarea {
        width: 100%;
        margin: 0.5rem 0;
        font-size: 1rem;
        padding: 0.5em;
        border: 1px solid #555;
        border-radius: 6px;
      }
      > textarea {
        resize: none;
        height: 8rem;
      }
    }
    > button {
      padding: 0.6rem;
      background-color: ${({ theme }) => theme.color.baeminPrimary};
      color: white;
      border-radius: 6px;
      &:hover {
        opacity: 0.8;
      }
    }
    .form__loading {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      ${({ theme }) => theme.flexCenter};
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;
