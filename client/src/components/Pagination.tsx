import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import { Path } from '@lib/router/history';
import { useCallback } from 'react';

type Props = {
  currentPage: number;
  totalPage: number;
  path: Path;
  link: boolean;
  setPage?: (value: number) => void;
};

type PaginationItemProps = {
  text: string;
  page: number;
  currentPage: number;
  link: boolean;
  path: Path;
  setPage?: (value: number) => void;
};

export default function Pagination({ currentPage, totalPage, path, link, setPage }: Props) {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const maxPage = Math.min(totalPage, startPage + 4);
  const range = Array.from({ length: maxPage - startPage + 1 }, (_, idx) => idx + startPage);

  const convertPageNum = (pageNum: number) => {
    if (pageNum === 1) return '';
    return String(pageNum);
  };
  return (
    <PaginationListWrapper>
      <ul className="pagination--list">
        {currentPage !== 1 && (
          <PaginationItem
            text="처음으로"
            link={link}
            path={path}
            page={1}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
        {currentPage !== totalPage && (
          <PaginationItem
            text="마지막으로"
            link={link}
            path={path}
            page={totalPage}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
      </ul>
      <ul className="pagination--list">
        {startPage !== 1 && (
          <PaginationItem
            text="..."
            link={link}
            path={path}
            page={startPage - 1}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
        {range.map((pageNum) => {
          return (
            <PaginationItem
              key={pageNum}
              text={pageNum.toString()}
              link={link}
              path={path}
              page={pageNum}
              currentPage={currentPage}
              setPage={setPage}
            />
          );
        })}
        {maxPage < totalPage && (
          <PaginationItem
            text="..."
            link={link}
            path={path}
            page={maxPage + 1}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
      </ul>
    </PaginationListWrapper>
  );
}

function PaginationItem({ text, link, path, page, currentPage, setPage }: PaginationItemProps) {
  const convertPageNum = useCallback((pageNum: number) => {
    if (pageNum === 1) return '';
    return String(pageNum);
  }, []);

  return (
    <li className="pagination--item">
      {link ? (
        <NavLink goTop to={{ search: { ...path.search, page: convertPageNum(page) } }}>
          <p className={currentPage === page ? 'current' : ''}>{text}</p>
        </NavLink>
      ) : (
        <p
          onClick={
            setPage
              ? () => {
                  setPage(page);
                }
              : () => {}
          }
          className={currentPage === page ? 'current' : ''}
        >
          {text}
        </p>
      )}
    </li>
  );
}

const PaginationListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  .pagination--list {
    margin: 0.3em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .pagination--item {
      p {
        margin: 0 0.3em;
        padding: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fcfcf7;
        border-radius: 3px;
      }
      p.current {
        background-color: ${({ theme }) => theme.color.baeminPrimary};
        color: white;
      }
      p:not(.current):hover {
        cursor: pointer;
        background-color: #eee;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .pagination--item {
      font-size: 0.8rem;
    }
  }
`;
