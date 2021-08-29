import usePath from '@hooks/usePath';
import NavLink from '@lib/router/NavLink';
import styled from '@lib/styled-components';
import { CSSProperties } from 'react';
import theme from '@styles/theme';

const activeStyle: CSSProperties = {
  color: theme.color.baeminPrimary,
};

const MenuBar = function () {
  return (
    <MenuTab>
      <Title>메뉴</Title>
      <Menu>
        <MenuItem>
          <NavLink exact to="/my-page/edit" activeStyle={activeStyle}>
            회원정보 변경
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/orders" activeStyle={activeStyle}>
            나의 주문목록
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/like" activeStyle={activeStyle}>
            내가 좋아한 상품
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/review" activeStyle={activeStyle}>
            나의 상품후기
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/qna" activeStyle={activeStyle}>
            나의 상품문의
          </NavLink>
        </MenuItem>
      </Menu>
    </MenuTab>
  );
};

const MenuTab = styled.div`
  width: 250px;
  padding: 0.5rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
  }
`;

const Title = styled.h1`
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1.2rem;
  }
`;

const Menu = styled.ul`
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid lightgray;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 0.8rem;
    padding-top: 0.8rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid lightgray;
  }
`;

const MenuItem = styled.li`
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover a {
    display: inline-block;
    width: 100%;
    color: ${({ theme }) => theme.color.baeminPrimary};
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

export default MenuBar;
