import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import usePath from '@hooks/usePath';

export default function Sort() {
  const path = usePath();
  const current = path.search.sort || '';
  return (
    <SortWrapper>
      <li className="sort--item">
        <NavLink to={{ search: { sort: '', page: '' } }}>
          <p className={current === '' ? 'current' : ''}>최신순</p>
        </NavLink>
      </li>
      <li className="sort--item">
        <NavLink to={{ search: { sort: 'popular', page: '' } }}>
          <p className={current === 'popular' ? 'current' : ''}>인기순</p>
        </NavLink>
      </li>
      <li className="sort--item">
        <NavLink to={{ search: { sort: 'low-price', page: '' } }}>
          <p className={current === 'low-price' ? 'current' : ''}>낮은가격순</p>
        </NavLink>
      </li>
      <li className="sort--item">
        <NavLink to={{ search: { sort: 'high-price', page: '' } }}>
          <p className={current === 'high-price' ? 'current' : ''}>높은가격순</p>
        </NavLink>
      </li>
    </SortWrapper>
  );
}

const SortWrapper = styled.ul`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > .sort--item {
    margin: 0 0.5rem;
    > a {
      > p {
        padding: 0.6rem;
        border: 1px solid ${({ theme }) => theme.color.inputBorder};
        border-radius: 2rem;
      }

      p.current {
        background-color: ${({ theme }) => theme.color.baeminDark};
        color: white;
        border: none;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobileSmall}) {
    overflow-x: auto;
    justify-content: flex-start;
    &::-webkit-scrollbar {
      display: none;
    }
    > .sort--item {
      flex: none;
    }
  }
`;
