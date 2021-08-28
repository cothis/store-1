import { useTempOrders, useUpdateOrder } from '@hooks/query/orders/useTempOrders';
import { useUser } from '@hooks/query/users';
import useHistory from '@hooks/useHistory';
import useParams from '@hooks/useParams';
import Redirect from '@lib/router/Redirect';
import styled from '@lib/styled-components';
import { IOrder, OrderStatus } from '@types';
import { formToObject } from '@utils/formToObject';
import { FormEventHandler, useCallback, useState } from 'react';

function Order() {
  const { id: orderId } = useParams();
  const { status, data: order, error } = useTempOrders(orderId);
  const updateOrder = useUpdateOrder();
  const { isError, data: user } = useUser();

  const renderOrderDetail = useCallback(() => {
    switch (status) {
      case 'loading':
        return <div>Loading...</div>;
      case 'error':
        if (error instanceof Error) {
          return <Redirect to="/" />;
        }
        break;
      default:
        if (!order) return;
        return (
          <div className="order-detail">
            <h2>주문상세내역</h2>
            {order.orderHasProducts.map((orderHasProduct) => (
              <div className="product" key={`product${orderHasProduct.id}`}>
                <div className="product-info">
                  <img className="product-image" src={orderHasProduct.product.imageUrl} alt="상품이미지" />
                  <div className="product-title">{orderHasProduct.product.title}</div>
                </div>
                <div className="product-quantity">{orderHasProduct.quantity}</div>
                <div className="product-price">
                  {orderHasProduct.product.price || orderHasProduct.product.originalPrice}
                </div>
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
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const result = formToObject<IOrder>(e.target);
    result.id = orderId;
    result.status = OrderStatus.READY;
    updateOrder.mutate(result, {
      onSuccess: ({ data }) => {
        console.log(data);
      },
    });
  };

  return (
    <OrderWrapper>
      <h1 className="title">주문서작성/결제</h1>
      {renderOrderDetail()}
      <OrderForm className="order-form" onSubmit={handleSubmit}>
        <div className="user-info">
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
                  defaultValue={user?.name}
                />
              </div>
            </div>
            <div className="row">
              <div className="description">전화번호</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="phone"
                  name="senderCall"
                  id="sender-call"
                  defaultValue={order?.senderCall}
                />
              </div>
            </div>
            <div className="row">
              <div className="description required">휴대폰 번호</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="phone"
                  name="senderPhone"
                  id="sender-phone"
                  defaultValue={order?.senderPhone}
                />
              </div>
            </div>
            <div className="row">
              <div className="description required">이메일</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="email"
                  name="senderMail"
                  id="sender-mail"
                  defaultValue={user && user.email}
                />
                <div className="extra">직접입력</div>
              </div>
            </div>
          </div>
        </div>
        <div className="delivery-info">
          <h2>배송정보</h2>
          <div className="table">
            <div className="row">
              <div className="description required">받으실 분</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="text"
                  name="receiverName"
                  id="receiver-name"
                  defaultValue={order?.receiverName}
                />
              </div>
            </div>
            <div className="row">
              <div className="description required">받으실 곳</div>
              <div className="content">
                <div className="address-search">
                  <input
                    className="input-medium"
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    readOnly={true}
                    defaultValue={order?.zipcode}
                  />
                  <button type="button">우편번호검색</button>
                </div>
                <div className="address">
                  <input
                    className="address"
                    type="text"
                    name="address"
                    id="address"
                    readOnly={true}
                    defaultValue={order?.address}
                  />
                  <input
                    className="address-detail"
                    type="text"
                    name="addressDetail"
                    id="address-detail"
                    defaultValue={order?.addressDetail}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="description">전화번호</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="phone"
                  name="receiverCall"
                  id="receiver-call"
                  defaultValue={order?.receiverCall}
                />
              </div>
            </div>
            <div className="row">
              <div className="description required">휴대폰 번호</div>
              <div className="content">
                <input
                  className="input-medium"
                  type="phone"
                  name="receiverPhone"
                  id="receiver-phone"
                  defaultValue={order?.receiverPhone}
                />
              </div>
            </div>
            <div className="row">
              <div className="description">남기실 말씀</div>
              <div className="content">
                <input className="input-large" type="text" name="message" id="message" defaultValue={order?.message} />
              </div>
            </div>
          </div>
        </div>
        <div className="order-info">
          <h2>결제 정보</h2>
          <div className="table">
            <div className="row">
              <div className="description">상품 합계 금액</div>
              <div className="content">{order?.productsPrice.toLocaleString()}원</div>
            </div>
            <div className="row">
              <div className="description">배송비</div>
              <div className="content">{order?.deliveryFee.toLocaleString()}원</div>
            </div>
            <div className="row">
              <div className="description">최종 결제금액</div>
              <div className="content">{order?.paymentPrice.toLocaleString()}원</div>
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
        <button className="payment" type="submit">
          결제하기
        </button>
      </OrderForm>
    </OrderWrapper>
  );
}

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

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Order;
