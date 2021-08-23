import usePath from '@hooks/usePath';
import NavLink from '@lib/router/NavLink';
import styled from '@lib/styled-components';
import { CSSProperties } from 'react';
import theme from '@styles/theme';

const MenuBar = function () {
  const { pathname } = usePath();
  const changeInfomationPath = pathname === '/my-page/edit' ? pathname : '/my-page/confirm';
  const activeStyle: CSSProperties = {
    color: theme.color.baeminPrimary,
  };
  return (
    <MenuTab>
      <Title>
        메뉴 <i className="fas fa-chevron-down"></i>
      </Title>
      <Menu>
        <MenuItem>
          <NavLink exact to={changeInfomationPath} activeStyle={activeStyle}>
            회원정보 변경
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/qna">
            나의 상품문의
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink exact to="/my-page/review ">
            나의 상품후기
          </NavLink>
        </MenuItem>
      </Menu>
    </MenuTab>
  );
};

const MenuTab = styled.div`
  width: 250px;
  padding: 1%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 100%;
    margin-top: 20%;
  }
`;

const Title = styled.h1`
  display: flex;
  width: 70%;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1.8rem;
    height: 55px;
    width: 100%;
    margin-bottom: 5%;
  }
  > i {
    margin-left: auto;
    display: none;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display: inline-block;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Menu = styled.ul`
  margin-bottom: 10%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    border-bottom: 1px solid lightgray;
    width: 100%;
  }
`;

const MenuItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 10%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-bottom: 5%;
  }
`;

export default MenuBar;
