import { useProductTitle } from '@hooks/query/products';
import useLocalStorage from '@hooks/useLocalStorage';
import Link from '@lib/router/Link';
import styled from '@lib/styled-components';
import { QUICK_SEARCH_MAX_LENGTH } from './Search';

interface AutoCompleteProps {
  query: string;
  setModal: (bool: boolean) => void;
  resetInput: () => void;
}

export default function AutoComplete({ query, setModal, resetInput }: AutoCompleteProps) {
  const [queryArr, setQueryArr] = useLocalStorage<string[]>('query', []);
  const { data, isError, error } = useProductTitle(query);
  if (isError) throw error;
  if (!data) return <Wrapper />;

  const clickHandler = (title: string) => () => {
    if (queryArr.length >= QUICK_SEARCH_MAX_LENGTH - 1) queryArr.pop();
    if (queryArr.includes(title)) setQueryArr([title, ...queryArr.filter((q) => q !== title)]);
    else setQueryArr([title, ...queryArr]);
    resetInput();
    setModal(false);
  };
  return (
    <Wrapper className={data.length ? '' : 'empty'}>
      {data.length ? (
        <>
          {data.map((data) => (
            <div onClick={clickHandler(data.title)} key={`result-${data.id}`} className="quick-content">
              <Link to={{ pathname: `/products/${data.id}` }}>
                {data.title.split('').map((letter, idx) => {
                  if (query.includes(letter))
                    return (
                      <span className="matched" key={`matched-${data.id}-${idx}`}>
                        {letter}
                      </span>
                    );
                  else return <span key={`non-matched-${data.id}-${idx}`}>{letter}</span>;
                })}
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p>입력하신 이름과 맞는 상품이 없습니다.</p>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  width: 90vw;
  height: 50vh;
  max-width: 700px;
  top: 100%;
  left: 50%;
  background-color: #fcfcf7;
  transform: translateX(-50%);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  padding: 1rem;
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
  .matched {
    color: ${({ theme }) => theme.color.baeminPrimary};
  }
  a {
    width: 100%;
  }
`;
