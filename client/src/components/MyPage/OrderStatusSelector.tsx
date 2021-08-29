import styled from '@lib/styled-components';
import NavLink from '@lib/router/NavLink';
import usePath from '@hooks/usePath';
import { OrderStatus } from '@types';

export default function OrderStatusSelector() {
  const path = usePath();
  const current = path.search.status || '';
  return (
    <Container>
      <li className="item">
        <NavLink to={{ search: { status: '', page: '' } }}>
          <p className={current === '' ? 'current' : ''}>전체</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.READY, page: '' } }}>
          <p className={current === OrderStatus.READY ? 'current' : ''}>주문신청</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.ACCEPTED, page: '' } }}>
          <p className={current === OrderStatus.ACCEPTED ? 'current' : ''}>주문확인</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.DELIVERING, page: '' } }}>
          <p className={current === OrderStatus.DELIVERING ? 'current' : ''}>배송중</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.DONE, page: '' } }}>
          <p className={current === OrderStatus.DONE ? 'current' : ''}>배송완료</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.CANCELED, page: '' } }}>
          <p className={current === OrderStatus.CANCELED ? 'current' : ''}>취소</p>
        </NavLink>
      </li>
      <li className="item">
        <NavLink to={{ search: { status: OrderStatus.REFUNDED, page: '' } }}>
          <p className={current === OrderStatus.REFUNDED ? 'current' : ''}>환불</p>
        </NavLink>
      </li>
    </Container>
  );
}

const Container = styled.ul`
  margin: 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  > .item {
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
    > .item {
      flex: none;
    }
  }
`;
