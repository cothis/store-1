import styled from '@lib/styled-components';
import { IOrder } from '@types';
import { orderStateToKorean } from '@utils/orders';
import OrderPreviewProduct from './OrderPreviewProduct';

interface OrderPreviewProps {
  order: IOrder;
}

export default function OrderPreview({ order }: OrderPreviewProps) {
  return (
    <Container>
      <Header>
        <span>
          주문번호: <strong>{Number(order.id).toLocaleString()}</strong>
        </span>
        <span>
          상태: <strong>{orderStateToKorean(order.status)}</strong>
        </span>
      </Header>
      <ul>
        {order.orderHasProducts.map((orderProduct) => (
          <OrderPreviewProduct key={orderProduct.id} orderProduct={orderProduct} />
        ))}
      </ul>
      <Footer>
        <span className="non-borken">
          상품금액 (<strong>{Number(order.productsPrice).toLocaleString()}</strong>원)
        </span>
        <span className="op">+</span>
        <span className="non-borken">
          배송비 (<strong>{Number(order.productsPrice) > 30000 ? '0' : '2,500'}</strong>원)
        </span>
        <span className="op">=</span>
        <span className="non-borken">
          결제금액 (<strong>{Number(order.paymentPrice).toLocaleString()}</strong>원)
        </span>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  border-radius: 6px;
  background-color: white;
  overflow: hidden;
  margin-bottom: 1.5rem;

  strong {
    font-weight: bold;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
`;

const Footer = styled.div`
  padding: 0.5rem;
  border-top: 1px solid lightgrey;
  text-align: right;
  font-size: 0.9rem;
  line-height: 1.2;

  .op {
    margin: 0 0.8rem;
  }

  .non-borken {
    white-space: nowrap;
  }
`;
