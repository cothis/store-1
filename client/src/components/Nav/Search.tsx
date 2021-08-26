import styled from '@lib/styled-components';
import { SyntheticEvent, useRef, useEffect, MouseEvent, useCallback } from 'react';
import ExitBtn from '@components/ExitBtn';
import useLocalStorage from '@hooks/useLocalStorage';
import useModal from '@hooks/useModal';
import useHistory from '@hooks/useHistory';
import notify from '@utils/toastify';
import { SEARCH_INPUT_INVALID } from '@constants/message';

const SEARCH_MIN_LENGTH = 2;
const SEARCH_MAX_LENGTH = 20;

export default function SearchModal() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [queryArr, setQueryArr] = useLocalStorage<string[]>('query', []);
  const [modal, setModal] = useModal();
  const history = useHistory();

  useEffect(() => {
    if (!modal) return;
    const { current } = searchInput;
    current?.focus();
  }, [modal]);

  const offHandler = () => {
    setModal(false);
  };

  const searchValidation = useCallback((keyword: string, arr: string[]) => {
    if (keyword.length < SEARCH_MIN_LENGTH || keyword.length > SEARCH_MAX_LENGTH) {
      notify('error', SEARCH_INPUT_INVALID);
      return false;
    }

    const nextQueryArr = arr.concat([]);
    if (nextQueryArr.includes(keyword)) {
      nextQueryArr.splice(nextQueryArr.indexOf(keyword), 1);
    } else if (nextQueryArr.length >= 20) {
      nextQueryArr.pop();
    }
    nextQueryArr.unshift(keyword);

    setQueryArr(nextQueryArr);
    return true;
  }, []);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const { search } = e.target as HTMLFormElement;
    const keyword = search.value;
    if (!searchValidation(keyword, queryArr)) return;
    history.push({ pathname: '/search', search: { keyword } });
    offHandler();
  };

  const quickHandler = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const parent = target.closest('.quick-content') as HTMLElement;
    const keyword = parent.dataset.query;
    if (!parent || !keyword) return;
    if (!searchValidation(keyword, queryArr)) return;
    history.push({ pathname: '/search', search: { keyword } });
    offHandler();
  };

  const queryDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const parent = target.closest('.quick-content') as HTMLElement;
    if (!parent) return;
    const nextQueryArr = queryArr.filter((query) => query !== parent.dataset.query);
    setQueryArr(nextQueryArr);
  };

  return (
    <>
      <button
        className="search-btn"
        onClick={() => {
          setModal(true);
        }}
      >
        <i className="fas fa-search"></i>
      </button>
      <div
        style={{
          display: modal ? 'block' : 'none',
        }}
      >
        <SearchFormWrapper>
          <form onSubmit={submitHandler}>
            <FormContent>
              <input
                name="search"
                required
                type="text"
                placeholder="검색어를 입력해주세요."
                ref={searchInput}
                autoComplete="off"
              ></input>
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </FormContent>
            <ExitBtn
              absolute
              transform="translateY(-50%)"
              right="0"
              top="50%"
              width="30px"
              height="30px"
              color="white"
              strokeWidth="6"
              onClick={offHandler}
            />
          </form>
        </SearchFormWrapper>
        <QuickSearchWrapper className={queryArr.length ? '' : 'empty'}>
          {queryArr.length ? (
            queryArr.map((query) => (
              <div onClick={quickHandler} key={query} data-query={query} className="quick-content">
                <p>{query}</p>
                <ExitBtn
                  absolute
                  right="0"
                  top="50%"
                  transform="translateY(-50%)"
                  width="20px"
                  height="20px"
                  color="black"
                  strokeWidth="6"
                  onClick={queryDelete}
                />
              </div>
            ))
          ) : (
            <p>최근 검색어가 없습니다.</p>
          )}
        </QuickSearchWrapper>
        <ModalBackground onClick={offHandler}></ModalBackground>
      </div>
    </>
  );
}

const SearchFormWrapper = styled.div`
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  > form {
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    max-width: 700px;
    width: 90vw;
    height: 100%;
  }
`;
const FormContent = styled.div`
  @keyframes form-content-fade-in {
    from {
      transform: translateX(10%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  position: relative;
  width: 80%;
  border-radius: 20px;
  background-color: #222;
  animation: form-content-fade-in 0.5s forwards;
  > input {
    width: 100%;
    font-size: 1rem;
    color: white;
    background: none;
    border: none;
    padding: 0.5em;
  }
  > button {
    position: absolute;
    color: white;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const QuickSearchWrapper = styled.div`
  @keyframes quick-fade-in {
    from {
      transform: translate3d(-50%, -100%, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
  }
  position: absolute;
  z-index: 2;
  width: 90vw;
  height: 80vh;
  max-width: 700px;
  top: 100%;
  left: 50%;
  background-color: white;
  transform: translateX(-50%);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  padding: 1rem;
  animation: quick-fade-in 0.5s forwards;
  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .quick-content {
    position: relative;
    padding: 0.5rem 0;
    &:hover {
      background-color: #ddd;
    }
  }
`;
const ModalBackground = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
`;
