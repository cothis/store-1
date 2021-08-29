import Loading from '@components/Loading';
import { useOrders } from '@hooks/query/orders/useTempOrders';
import { toAvailablePriceText, toPriceText } from '@utils/toPriceText';
import { ChangeEventHandler, useEffect, useState } from 'react';

interface StatusRadioGroup {
  null: boolean;
  ready: boolean;
  accepted: boolean;
  delivering: boolean;
  done: boolean;
  canceled: boolean;
  refunded: boolean;
  [key: string]: boolean;
}

const statusRadioGroupInit: StatusRadioGroup = {
  null: true,
  ready: false,
  accepted: false,
  delivering: false,
  done: false,
  canceled: false,
  refunded: false,
};

const MyOrder = () => {
  const [statusRadio, setStatusRadio] = useState(statusRadioGroupInit);
  const [status, setStatus] = useState('null');
  const { data: orders, isLoading, isError, refetch } = useOrders(status);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newState = { ...statusRadioGroupInit };
    newState.null = false;
    newState[target.value] = target.checked;
    setStatusRadio(newState);
    setStatus(target.value);
  };

  useEffect(() => {
    refetch();
  }, [status]);

  return (
    <div>
      <h1>주문내역을 구경해요</h1>
      <form>
        <h2>주문 종류</h2>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="null" checked={statusRadio.null} />
          <span>전체보기</span>
        </label>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="ready" checked={statusRadio.ready} />
          <span>준비중</span>
        </label>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="accepted" checked={statusRadio.accepted} />
          <span>수락됨</span>
        </label>
        <label>
          <input
            type="radio"
            name="staus"
            onChange={handleChange}
            value="delivering"
            checked={statusRadio.delivering}
          />
          <span>배송중</span>
        </label>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="done" checked={statusRadio.done} />
          <span>완료됨</span>
        </label>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="canceled" checked={statusRadio.canceled} />
          <span>취소됨</span>
        </label>
        <label>
          <input type="radio" name="staus" onChange={handleChange} value="refunded" checked={statusRadio.refunded} />
          <span>환불됨</span>
        </label>
      </form>

      {isLoading && <Loading />}
      {isError && '에러에요'}

      {orders && orders.length > 0
        ? orders.map((order) => {
            return (
              <div key={order.id}>
                <div className="order-info">
                  <div>{order.status}</div>
                  <div>{order.createAt}</div>
                  <div>{toPriceText(order.paymentPrice)}</div>
                </div>
                <div className="product-info">
                  {order.orderHasProducts.map(({ id, product, quantity }) => {
                    return (
                      <div className="product-item" key={id}>
                        <div className="product-header">
                          <div>
                            <img src={product.imageUrl} alt="제품이미지" />
                          </div>
                          <div>
                            <div>{product.title}</div>
                          </div>
                        </div>
                        <div className="product-price">
                          {toAvailablePriceText(product.price, product.originalPrice)}
                        </div>
                        <div className="product-quantity">{quantity}개</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        : '텅 비었어요'}
    </div>
  );
};

export default MyOrder;