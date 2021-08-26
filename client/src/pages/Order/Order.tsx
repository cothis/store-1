import { useTempOrders } from '@hooks/query/orders/useTempOrders';
import useParams from '@hooks/useParams';
import styled from '@lib/styled-components';
import { IOrder, OrderStatus } from '@types';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQueries, useQuery } from 'react-query';

type UpdateOrderDto = Omit<IOrder, 'id'>;

interface IUser {
  id: string;
  loginId: string;
  isAdmin: boolean;
  email: string;
  name: string;
  zipcode: string;
  address: string;
  addressDetail: string;
}

/**
 * 1. 주문 내역 가져오기(TEMP 인것만)
 * 2.
 */
const Order = () => {
  const { id: orderId } = useParams();
  const { status, data, error } = useTempOrders(orderId);
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery('user', async () => {
    const { data } = await axios.get<IUser>('http://localhost:8080/api/v1/users/me', { withCredentials: true });
    return data;
  });

  const renderOrderDetail = useCallback(() => {
    switch (status) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        if (error instanceof Error) {
          return <span>Error: {error.message}</span>;
        }
        break;
      default:
        if (!data) return;
        return (
          <div className="order-detail">
            <h2>주문상세내역</h2>
            <div className="products-header">
              <div className="product-info">상품 정보</div>
              <div className="product-quantity">수량</div>
              <div className="product-price">상품금액</div>
              <div className="product-total-price">합계금액</div>
            </div>
            {data.orderHasProducts.map((orderHasProduct) => (
              <div className="product" key={`product${orderHasProduct.id}`}>
                <div className="product-info">
                  <img className="product-image" src={orderHasProduct.product.imageUrl} alt="상품이미지" />
                  <div className="product-title">{orderHasProduct.product.title}</div>
                </div>
                <div className="product-quantity">{orderHasProduct.quantity}</div>
                <div className="product-price">{orderHasProduct.product.price}</div>
                <div className="product-total-price">
                  {orderHasProduct.product.price && orderHasProduct.product.price * orderHasProduct.quantity}
                  {orderHasProduct.product.originalPrice &&
                    orderHasProduct.product.originalPrice * orderHasProduct.quantity}
                  {orderHasProduct.product.priceText && orderHasProduct.product.priceText}
                </div>
              </div>
            ))}
          </div>
        );
    }
  }, [status]);

  const [addressInfo, setAddress] = useState({ zipcode: '', address: '' });

  return (
    <OrderWrapper>
      <h1 className="title">주문서작성/결제</h1>
      {renderOrderDetail()}
      <form className="user-info">
        <h2>주문자 정보</h2>
        <div className="table">
          <div className="row">
            <div className="description required">주문하시는 분</div>
            <div className="content">
              <input
                className="input-medium"
                type="text"
                name="senderName"
                id="sender-name"
                defaultValue={user && user.name}
              />
            </div>
          </div>
          <div className="row">
            <div className="description">전화번호</div>
            <div className="content">
              <input className="input-medium" type="phone" name="senderCall" id="sender-call" />
            </div>
          </div>
          <div className="row">
            <div className="description required">휴대폰 번호</div>
            <div className="content">
              <input className="input-medium" type="phone" name="senderPhone" id="sender-phone" />
            </div>
          </div>
          <div className="row">
            <div className="description required">이메일</div>
            <div className="content">
              <input
                className="input-medium"
                type="email"
                name="senderEmail"
                id="sender-email"
                defaultValue={user && user.email}
              />
              <div className="extra">직접입력</div>
            </div>
          </div>
        </div>
      </form>
      <div className="delivery-info">
        <h2>배송정보</h2>
        <div className="table">
          <div className="row">
            <div className="description required">받으실 분</div>
            <div className="content">
              <input className="input-medium" type="text" name="receiverName" id="receiver-name" />
            </div>
          </div>
          <div className="row">
            <div className="description required">받으실 곳</div>
            <div className="content">
              <div className="address-search">
                <input className="input-medium" type="text" name="zipcode" id="zipcode" readOnly={true} />
                <button type="button">우편번호검색</button>
              </div>
              <div className="address">
                <input className="address" type="text" name="address" id="address" readOnly={true} />
                <input className="address-detail" type="text" name="addressDetail" id="address-detail" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="description">전화번호</div>
            <div className="content">
              <input className="input-medium" type="phone" name="receiverCall" id="receiver-call" />
            </div>
          </div>
          <div className="row">
            <div className="description required">휴대폰 번호</div>
            <div className="content">
              <input className="input-medium" type="phone" name="receiverPhone" id="receiver-phone" />
            </div>
          </div>
          <div className="row">
            <div className="description">남기실 말씀</div>
            <div className="content">
              <input className="input-large" type="text" name="message" id="message" />
            </div>
          </div>
        </div>
      </div>
      <div className="order-info">
        <h2>결제 정보</h2>
        <div className="table">
          <div className="row">
            <div className="description">상품 합계 금액</div>
            <div className="content">3,500원</div>
          </div>
          <div className="row">
            <div className="description">배송비</div>
            <div className="content">2500원</div>
          </div>
          <div className="row">
            <div className="description">최종 결제금액</div>
            <div className="content">3,500원</div>
          </div>
          <div className="row">
            <div className="description">결제방법</div>
            <div className="content">무통장입금</div>
          </div>
        </div>
      </div>
      <div className="agreement">
        <p>
          전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지
          않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
        </p>
        <div className="checkbox">
          <input type="checkbox" name="agree" id="agree" />
          <label htmlFor="agree">
            <span className="bold">(필수)</span>
            <span>구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.</span>
          </label>
        </div>
      </div>
      <button className="payment" type="button" onClick={() => {}}>
        결제하기
      </button>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: beige;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
  }
`;

export default Order;
