import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import { Path } from '@lib/router/history';

type Props = {
  currentPage: number;
  totalPage: number;
  path: Path;
};

export default function Pagination({ currentPage, totalPage, path }: Props) {
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
          <li className="pagination--item">
            <NavLink goTop to={{ search: { ...path.search, page: convertPageNum(1) } }}>
              <p>처음으로</p>
            </NavLink>
          </li>
        )}
        {currentPage !== totalPage && (
          <li className="pagination--item">
            <NavLink goTop to={{ search: { ...path.search, page: convertPageNum(totalPage) } }}>
              <p>마지막으로</p>
            </NavLink>
          </li>
        )}
      </ul>
      <ul className="pagination--list">
        {startPage !== 1 && (
          <li className="pagination--item">
            <NavLink goTop to={{ search: { ...path.search, page: convertPageNum(startPage - 1) } }}>
              <p>{'...'}</p>
            </NavLink>
          </li>
        )}
        {range.map((pageNum) => {
          return (
            <li className="pagination--item item-number" key={pageNum}>
              <NavLink
                to={{ search: { ...path.search, page: convertPageNum(pageNum) } }}
                activeClassName="page-current"
                goTop
              >
                <p>{pageNum}</p>
              </NavLink>
            </li>
          );
        })}
        {maxPage < totalPage && (
          <li className="pagination--item">
            <NavLink goTop to={{ search: { ...path.search, page: convertPageNum(maxPage + 1) } }}>
              <p>{'...'}</p>
            </NavLink>
          </li>
        )}
      </ul>
    </PaginationListWrapper>
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
      a.page-current > p {
        background-color: ${({ theme }) => theme.color.baeminPrimary};
        color: white;
      }
      a:not(.page-current) > p:hover {
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
