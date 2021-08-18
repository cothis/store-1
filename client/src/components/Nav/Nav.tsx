import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import logoImg from '@assets/images/baemin_store_logo.png';

import Category, { ICategory } from './Category';
import Search from './Search';
import Auth from './Auth';

const Nav = () => {
  return (
    <StyledNav>
      <NavHeader>
        <Category categories={categoriesMock} />
        <NavLink exact to="/">
          <img className="logo-img" src={logoImg} alt="배민 문방구 로고 이미지" />
        </NavLink>
        <NavRight>
          <Search />
          <Auth />
          <button className="basket">
            <i className="fas fa-shopping-cart"></i>
            {cart.length ? (
              <div className="cart-length">
                <p>{cart.length}</p>
              </div>
            ) : (
              <></>
            )}
          </button>
        </NavRight>
      </NavHeader>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: fixed;
  background-color: #fcfcf7;
  z-index: 10;
  width: 100%;
  top: 0;
  padding: 2rem 0;
  &::after {
    content: '';
  }
`;
const NavHeader = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 0 0.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    position: static;
    justify-content: flex-end;
  }
  .logo-img {
    max-width: 200px;
    width: 40vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      left: 1rem;
      transform: translate3d(0, -50%, 0);
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  button {
    font-size: 1.4rem;
    margin: 0 0.5rem;
    &.basket {
      position: relative;
    }
    .cart-length {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate3d(60%, -60%, 0);
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7rem;
      font-weight: bold;
      color: white;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.color.red};
    }
  }
`;

let cart = [1, 2];
const categoriesMock: ICategory[] = [
  {
    id: 0,
    name: '전체',
  },
  {
    id: 1,
    name: '문구',
    children: [
      { id: 2, name: '펜' },
      { id: 3, name: '공책' },
      { id: 4, name: '문구 기타' },
    ],
  },
  {
    id: 5,
    name: '리빙',
    children: [
      { id: 6, name: '주방용품' },
      { id: 7, name: '미용' },
      { id: 8, name: '뱃지' },
      { id: 9, name: '리빙 기타' },
    ],
  },
  {
    id: 10,
    name: '책',
    children: [
      { id: 11, name: '매거진' },
      { id: 12, name: '배민' },
    ],
  },
  {
    id: 13,
    name: '배민그린',
    children: [
      { id: 14, name: '그린문구' },
      { id: 15, name: '그린리빙' },
    ],
  },
  {
    id: 16,
    name: 'ㅋㅋ에디션',
  },
  {
    id: 17,
    name: '을지로에디션',
  },
  {
    id: 20,
    name: '배달이친구들',
    children: [
      { id: 21, name: '피규어' },
      { id: 22, name: '포스터' },
      { id: 23, name: '포켓' },
    ],
  },
  {
    id: 24,
    name: '선물세트',
  },
  {
    id: 25,
    name: '콜라보레이션',
    children: [
      { id: 26, name: 'CU' },
      { id: 27, name: '세븐일레븐' },
      { id: 28, name: '2080' },
      { id: 29, name: '기타 콜라보' },
    ],
  },
];

export default Nav;
