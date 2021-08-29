import { useTempOrders, useUpdateOrder } from '@hooks/query/orders/useTempOrders';
import { useUser } from '@hooks/query/users';
import DaumPostcode, { AddressData } from 'react-daum-postcode';
import useParams from '@hooks/useParams';
import Redirect from '@lib/router/Redirect';
import { IOrder, OrderStatus, User } from '@types';
import { formToObject } from '@utils/formToObject';
import {
  ChangeEventHandler,
  createContext,
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import useModal from '@hooks/useModal';
import Link from '@lib/router/Link';
import notify from '@utils/toastify';
import {
  AgreementWrapper,
  Button,
  ButtonWrapper,
  DaumPostcodeStyle,
  ErrorMessage,
  H1,
  H2,
  Modal,
  ModalBackground,
  OrderDetailDiv,
  OrderForm,
  OrderWrapper,
  Product,
  Row,
  Table,
} from './style';

const toPriceText = (price?: number | string) => {
  if (!price) return;
  if (typeof price == 'string') price = Number(price);
  return price.toLocaleString() + '원';
};

interface CheckValidationList {
  senderName: boolean;
  senderCall: boolean;
  senderPhone: boolean;
  senderMail: boolean;
  receiverName: boolean;
  zipcode: boolean;
  address: boolean;
  addressDetail: boolean;
  receiverCall: boolean;
  receiverPhone: boolean;
  message: boolean;
  agreement: boolean;
  [key: string]: boolean;
}

const setValue = (key: string, value: boolean) => {};

const ValidationContext = createContext(setValue);

const validationInit: CheckValidationList = {
  senderName: false,
  senderCall: false,
  senderPhone: false,
  senderMail: false,
  receiverName: false,
  zipcode: false,
  address: false,
  addressDetail: false,
  receiverCall: false,
  receiverPhone: false,
  message: false,
  agreement: false,
};

function Order() {
  const { id: orderId } = useParams();
  const { status, data: order, error } = useTempOrders(orderId);
  const { data: user } = useUser();
  const updateOrder = useUpdateOrder();
  const [isEnableSubmit, setEnableSubmit] = useState(validationInit);

  const setValid = (key: string, value: boolean) => {
    isEnableSubmit[key] = value;
    setEnableSubmit(isEnableSubmit);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const valids: boolean[] = Object.values(isEnableSubmit);
    if (!valids.every((valid) => valid)) {
      notify('error', 'validation에 실패하였습니다!');
      return;
    }

    const result: any = formToObject<IOrder>(e.target);
    delete result.agree;

    result.id = orderId;
    result.status = OrderStatus.READY;
    updateOrder.mutate(result, {
      onSuccess: ({ data }) => {
        notify('success', '주문처리가 성공했습니다!! 메인으로 이동합니다.');
        <Redirect to="/" />;
      },
    });
  };

  const renderOrder = useCallback(() => {
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
        if (!user) return;
        return (
          <>
            <OrderDetail order={order}></OrderDetail>
            <OrderForm onSubmit={handleSubmit}>
              <UserAndDeliveryInfo order={order} user={user} />
              <OrderInfo order={order} />
              <Agreement />
              <ButtonWrapper>
                <Button className="payment" type="submit">
                  결제하기
                </Button>
              </ButtonWrapper>
            </OrderForm>
          </>
        );
    }
  }, [status, user]);

  return (
    <ValidationContext.Provider value={setValid}>
      <OrderWrapper>
        <H1>주문서작성/결제</H1>
        {renderOrder()}
      </OrderWrapper>
    </ValidationContext.Provider>
  );
}

interface OrderInfoProp {
  name: string;
  call: string;
  phone: string;
  mail: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  message: string;
}

interface SetOrderInfoProp {
  handleUpdate: (newOrderInfo: OrderInfoProp) => void;
}

interface GetOrderInfoProp {
  getOrderInfo: () => OrderInfoProp;
}

const UserAndDeliveryInfo: React.FC<OrderProp & UserProp> = ({ order, user }) => {
  const orderInfoInitial: OrderInfoProp = {} as OrderInfoProp;
  orderInfoInitial.name = user.name || '';
  orderInfoInitial.call = order.senderCall || '';
  orderInfoInitial.phone = order.senderPhone || '';
  orderInfoInitial.mail = order.senderMail || '';
  orderInfoInitial.zipcode = user.zipcode || '';
  orderInfoInitial.address = user.address || '';
  orderInfoInitial.addressDetail = user.addressDetail || '';
  orderInfoInitial.message = order.message || '';

  const [orderInfo, setOrderInfo] = useState(orderInfoInitial);

  const handleUpdate = (newOrderInfo: OrderInfoProp) => {
    setOrderInfo({ ...orderInfo, ...newOrderInfo });
  };

  const getOrderInfo = () => orderInfo;

  return (
    <>
      <UserInfo {...orderInfo} handleUpdate={handleUpdate} />
      <DeliveryInfo {...orderInfo} getOrderInfo={getOrderInfo} />
    </>
  );
};

interface InputWithErroMessageProp {
  className?: string;
  name: string;
  id: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  readOnly?: boolean;
  regex?: RegExp;
  $key: string;
  onChange?: ChangeEventHandler;
}
const InputWithErrorMessage: React.FC<InputWithErroMessageProp> = (props) => {
  const useValid = useContext(ValidationContext);
  const [isValid, setIsValid] = useState(true);

  const updateValid = useCallback(() => {
    if (!props.regex) {
      useValid(props.$key, true);
      return;
    }

    let target = null;
    if (props.value != undefined) {
      target = props.value;
    } else if (props.defaultValue != undefined) {
      target = props.defaultValue;
    } else {
      useValid(props.$key, true);
      return;
    }

    const isPass = props.regex.test(target.toString());
    useValid(props.$key, isPass);
  }, [props]);

  useEffect(() => {
    updateValid();
  }, []);

  useEffect(() => {
    updateValid();
  }, [props]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.onChange) props.onChange(e);
    if (!props.regex) return;
    const isPass = props.regex.test(e.target.value);
    useValid(props.$key, isPass);
    setIsValid(isPass);
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        className={props.className}
        name={props.name}
        id={props.id}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        value={props.value}
        readOnly={props.readOnly}
        onChange={handleChange}
      />
      {props.regex && (
        <ErrorMessage className={'error-message ' + (isValid ? '' : 'show')}>{props.children}</ErrorMessage>
      )}
    </div>
  );
};
interface OrderProp {
  order: IOrder;
}

interface UserProp {
  user: User;
}

const OrderDetail: React.FC<OrderProp> = ({ order }) => {
  return (
    <OrderDetailDiv>
      <H2>주문상세내역</H2>
      <Product>
        <div className="product-info-header">상품정보</div>
        <div className="product-quantity">수량</div>
        <div className="product-price">단가</div>
        <div className="product-total-price">금액</div>
      </Product>
      {order.orderHasProducts.map((orderHasProduct) => (
        <Product key={`product${orderHasProduct.id}`}>
          <div className="product-image-wrapper">
            <Link to={`/products/${orderHasProduct.product.id}`}>
              <img className="product-image" src={orderHasProduct.product.imageUrl} alt="상품이미지" />
            </Link>
          </div>
          <div className="product-title">
            <Link to={`/products/${orderHasProduct.product.id}`}>
              <span>{orderHasProduct.product.title}</span>
            </Link>
          </div>
          <div className="product-quantity">
            <div>{orderHasProduct.quantity.toLocaleString()}개</div>
          </div>
          <div className="product-price">
            <div>{toPriceText(orderHasProduct.product.price || orderHasProduct.product.originalPrice)}</div>
          </div>
          <div className="product-total-price">
            <div>
              {orderHasProduct.product.price && toPriceText(orderHasProduct.product.price * orderHasProduct.quantity)}
              {orderHasProduct.product.originalPrice &&
                toPriceText(orderHasProduct.product.originalPrice * orderHasProduct.quantity)}
            </div>
          </div>
        </Product>
      ))}
    </OrderDetailDiv>
  );
};

const UserInfo: React.FC<OrderInfoProp & SetOrderInfoProp> = (props) => {
  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.handleUpdate({ ...props, name: e.target.value });
  };

  const handleChangeCall: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.handleUpdate({ ...props, call: e.target.value });
  };

  const handleChangePhone: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.handleUpdate({ ...props, phone: e.target.value });
  };

  const handleChangeMail: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.handleUpdate({ ...props, mail: e.target.value });
  };

  return (
    <div className="user-info">
      <H2>주문자 정보</H2>
      <Table>
        <Row>
          <div className="description required">주문하시는 분</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="senderName"
              id="sender-name"
              $key="senderName"
              value={props.name}
              onChange={handleChangeName}
              regex={/^[0-9a-zㄱ-킼]{1,10}$/i}
            >
              이름은 한글, 영어, 숫자 1 ~ 10글자로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description">전화번호</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="senderCall"
              id="sender-call"
              $key="senderCall"
              value={props.call}
              onChange={handleChangeCall}
              regex={/^\d{2,3}-\d{3,4}-\d{4}$/}
            >
              전화번호 형식은 010-1234-5678 형태로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description required">휴대폰 번호</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="senderPhone"
              id="sender-phone"
              $key="senderPhone"
              value={props.phone}
              onChange={handleChangePhone}
              regex={/^\d{3}-\d{3,4}-\d{4}$/}
            >
              휴대번호 형식은 010-1234-5678 형태로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description required">이메일</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="senderMail"
              id="sender-mail"
              $key="senderMail"
              value={props.mail}
              onChange={handleChangeMail}
              regex={/^[0-9a-zㄱ-킼]([-_.]?[0-9a-zㄱ-킼])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i}
            >
              이메일형식에 맞게 작성해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
      </Table>
    </div>
  );
};

const DeliveryInfo: React.FC<OrderInfoProp & GetOrderInfoProp> = (props) => {
  const [modal, setModal] = useModal();
  const deliveryInfoInitial: OrderInfoProp = { ...props };
  const [deliveryInfo, setDeliveryInfo] = useState(deliveryInfoInitial);

  const handleComplete = (data: AddressData) => {
    setModal(false);
    setDeliveryInfo({ ...deliveryInfo, zipcode: data.zonecode, address: data.roadAddress });
  };
  const handleClick = () => {
    const newOrderInfo = props.getOrderInfo();
    setDeliveryInfo({ ...deliveryInfo, ...newOrderInfo });
  };
  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeliveryInfo({ ...deliveryInfo, name: e.target.value });
  };
  const handleChangeAddressDetail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeliveryInfo({ ...deliveryInfo, addressDetail: e.target.value });
  };
  const handleChangeCall: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeliveryInfo({ ...deliveryInfo, call: e.target.value });
  };
  const handleChangePhone: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeliveryInfo({ ...deliveryInfo, phone: e.target.value });
  };

  return (
    <div className="delivery-info">
      <H2>
        배송정보
        <Button type="button" onClick={handleClick}>
          주문자 정보로 하기
        </Button>
      </H2>
      <Table>
        <Row>
          <div className="description required">받으실 분</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="receiverName"
              id="sender-name"
              $key="receiverName"
              value={deliveryInfo.name}
              onChange={handleChangeName}
              regex={/^[0-9a-zㄱ-킼]{1,10}$/i}
            >
              이름은 한글, 영어, 숫자 1 ~ 10글자로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description required">받으실 곳</div>
          <div className="content address-wrapper">
            <div className="address-search">
              <InputWithErrorMessage
                className="full-width"
                name="zipcode"
                id="zipcode"
                $key="zipcode"
                placeholder="zipcode"
                readOnly={true}
                value={deliveryInfo.zipcode}
              />
              <Button type="button" onClick={() => setModal(true)}>
                우편번호검색
              </Button>
              <Modal $modal={modal}>
                <DaumPostcode style={DaumPostcodeStyle} onComplete={handleComplete} />
                <ModalBackground onClick={() => setModal(false)} />
              </Modal>
            </div>
            <div className="address">
              <InputWithErrorMessage
                className="full-width"
                name="address"
                id="address"
                $key="address"
                readOnly={true}
                value={deliveryInfo.address}
              />

              <InputWithErrorMessage
                className="full-width"
                name="addressDetail"
                id="address-detail"
                $key="addressDetail"
                placeholder="address detail"
                regex={/^.{0,100}$/}
                value={deliveryInfo.addressDetail}
                onChange={handleChangeAddressDetail}
              >
                상세주소는 100글자 이하로 입력해주세요.
              </InputWithErrorMessage>
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">전화번호</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="receiverCall"
              id="receiver-call"
              $key="receiverCall"
              regex={/^\d{2,3}-\d{3,4}-\d{4}$/}
              value={deliveryInfo.call}
              onChange={handleChangeCall}
            >
              전화번호 형식은 010-1234-5678 형태로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description required">휴대폰 번호</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-medium"
              name="receiverPhone"
              id="receiver-phone"
              $key="receiverPhone"
              value={deliveryInfo.phone}
              regex={/^\d{3}-\d{3,4}-\d{4}$/}
              onChange={handleChangePhone}
            >
              휴대번호 형식은 010-1234-5678 형태로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
        <Row>
          <div className="description">남기실 말씀</div>
          <div className="content">
            <InputWithErrorMessage
              className="input-large"
              name="message"
              id="message"
              $key="message"
              defaultValue={props.message}
              regex={/^.{0,30}$/}
            >
              메세지는 30글자 이하로 입력해주세요.
            </InputWithErrorMessage>
          </div>
        </Row>
      </Table>
    </div>
  );
};

const OrderInfo: React.FC<OrderProp> = ({ order }) => {
  return (
    <div className="order-info">
      <H2>결제 정보</H2>
      <Table>
        <Row>
          <div className="description">상품 합계 금액</div>
          <div className="content">{toPriceText(order.productsPrice)}</div>
        </Row>
        <Row>
          <div className="description">배송비</div>
          <div className="content">{toPriceText(order.deliveryFee)}</div>
        </Row>
        <Row>
          <div className="description">최종 결제금액</div>
          <div className="content">{toPriceText(order.paymentPrice)}</div>
        </Row>
        <Row>
          <div className="description">결제방법</div>
          <div className="content">무통장입금</div>
        </Row>
      </Table>
    </div>
  );
};

const Agreement: React.FC = () => {
  const useValid = useContext(ValidationContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    useValid('agreement', e.target.checked);
  };

  return (
    <AgreementWrapper>
      <p>
        전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지
        않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
      </p>
      <div className="checkbox">
        <input type="checkbox" name="agree" id="agree" onChange={handleChange} />
        <label htmlFor="agree">
          <span className="bold">(필수)</span>
          <span>구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.</span>
        </label>
      </div>
    </AgreementWrapper>
  );
};

export default Order;
