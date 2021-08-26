import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import logoImg from '@assets/images/baemin_store_logo.png';

import Category from './Category';
import Search from './Search';
import Auth from './Auth';
import CartButton from './CartButton';

const Nav = () => {
  return (
    <StyledNav>
      <NavHeader>
        <Category />
        <NavLink exact to="/">
          <img className="logo-img" src={logoImg} alt="배민 문방구 로고 이미지" />
        </NavLink>
        <NavRight>
          <Search />
          <Auth />
          <CartButton />
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

export default Nav;
