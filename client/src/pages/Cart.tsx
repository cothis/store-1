import { useState, useMemo, useCallback, ChangeEventHandler, MouseEventHandler } from 'react';
import styled from '@lib/styled-components';
import useLocalStorage from '@hooks/useLocalStorage';
import Link from '@lib/router/Link';
import { ICart } from '@types';
import ExitBtn from '@components/ExitBtn';

export default function Cart() {
  return (
    <CartPageWrapper>
      <h2 className="cart__header">장바구니</h2>
      <div className="cart__content">
        <CartForm />
      </div>
    </CartPageWrapper>
  );
}

interface IChecked {
  [key: string]: boolean;
}

function CartForm() {
  const [cart, setCart] = useLocalStorage<ICart[]>('cart', []);
  let countTimeOut: null | ReturnType<typeof setTimeout>;

  const initialChecked: IChecked = cart.reduce((acc, product) => {
    acc[product.id] = true;
    return acc;
  }, {} as IChecked);
  const [checked, setChecked] = useState<IChecked>(initialChecked);

  const totalPrice: number = useMemo(() => {
    const totalPrice = cart.reduce((sum, product) => {
      if (!checked[product.id]) return sum;
      return sum + product.count * product.price;
    }, 0);
    return totalPrice;
  }, [cart, checked]);

  const allCheckChangeHandler: ChangeEventHandler = useCallback(
    ({ target }) => {
      const allCheckBox = target as HTMLInputElement;
      const allChecked = allCheckBox.checked;
      const newChecked: IChecked = Object.entries(checked).reduce((acc, [key]) => {
        acc[key] = allChecked;
        return acc;
      }, {} as IChecked);
      setChecked(newChecked);
    },
    [cart],
  );

  const checkChangeHandler: ChangeEventHandler = ({ currentTarget }) => {
    const checkBox = currentTarget as HTMLInputElement;
    const productId = checkBox.dataset.id;
    if (!productId) return;
    const newChecked = { ...checked };
    newChecked[productId] = checkBox.checked;
    setChecked(newChecked);
  };

  const countBtnClickHandler: MouseEventHandler = ({ currentTarget }) => {
    const currentBtn = currentTarget as HTMLButtonElement;
    const productId = currentBtn.dataset.id;
    const type = currentBtn.dataset.type;
    if (!productId || !type) return;
    const newCart = cart.map((product) => {
      if (product.id !== productId) return product;
      if (product.count <= 1 && type === 'minus') return product;
      product.count = type === 'plus' ? product.count + 1 : product.count - 1;
      return product;
    });
    if (countTimeOut) clearTimeout(countTimeOut);
    countTimeOut = setTimeout(() => {
      setCart(newCart);
    }, 400);
  };

  const deleteBtnClickHandler: MouseEventHandler = useCallback(
    ({ currentTarget }) => {
      const parent = currentTarget.closest('.cart__form--content') as HTMLElement;
      const productId = parent.dataset.id;
      if (!productId) return;
      const newCart = cart.filter((product) => product.id !== productId);
      const newChecked = Object.assign({}, checked);
      delete newChecked[productId];
      setCart(newCart);
      setChecked(newChecked);
    },
    [cart],
  );

  if (!cart.length) {
    return <p className="cart__content--empty">텅</p>;
  }
  return (
    <>
      <form className="cart__form">
        <div className="cart__form--header">
          <label>
            <input
              type="checkbox"
              className="cart__form--checkbox"
              checked={Object.values(checked).every((check) => check)}
              onChange={allCheckChangeHandler}
            />
            <div className="cart__form--myCheck">
              <i className="fas fa-check"></i>
            </div>
            <p className="cart__form--all-text">전체 선택</p>
          </label>
        </div>
        {cart.map((product) => (
          <div className="cart__form--content" key={`cart-${product.id}`} data-id={product.id}>
            <label>
              <input
                type="checkbox"
                data-id={product.id}
                className="cart__form--checkbox"
                checked={checked[product.id]}
                onChange={checkChangeHandler}
              />
              <div className="cart__form--myCheck">
                <i className="fas fa-check"></i>
              </div>
            </label>
            <img src={product.imageUrl} />
            <Link to={`/product/${product.id}`}>{product.title}</Link>
            <div className="cart__form--product-count">
              <button
                type="button"
                data-type="minus"
                data-id={product.id}
                disabled={product.count <= 1}
                onClick={countBtnClickHandler}
              >
                <i className="fas fa-minus"></i>
              </button>
              <p>{product.count}</p>
              <button
                type="button"
                data-type="plus"
                data-id={product.id}
                disabled={product.count >= 99}
                onClick={countBtnClickHandler}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <p className="cart__form--product-price">{(product.count * product.price).toLocaleString()}원</p>
            <ExitBtn
              className="cart__form--delete"
              absolute
              top="0"
              right="0"
              width="20px"
              height="20px"
              color="red"
              onClick={deleteBtnClickHandler}
              strokeWidth="8"
            />
          </div>
        ))}
      </form>
      <div className="cart__result">
        <div className="cart__result--total-price">
          <p>총 합계금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>
        <button disabled={totalPrice === 0} className="cart__result--pay-btn">
          결제하기
        </button>
      </div>
    </>
  );
}

const CartPageWrapper = styled.div`
  margin: 0 auto;
  padding: 1rem;
  max-width: 1024px;
  .cart__header {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5em 0;
    display: inline-block;
  }
  .cart__form {
    width: 100%;
    margin: 1rem 0;
    > * {
      padding: 1rem 0;
    }
  }
  .cart__form--header {
    border-bottom: 2px solid #ddd;
    > label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .cart__form--content {
    display: grid;
    position: relative;
    align-items: center;
    grid-template-columns: 1fr 2fr 4fr 1fr 2fr;
    img {
      width: 70px;
    }
    > a:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
    &:nth-child(n + 2) {
      border-bottom: 1px solid #eee;
    }
    .cart__form--delete {
      display: none;
    }
    &:hover {
      .cart__form--delete {
        display: block;
      }
    }
  }
  .cart__form--product-count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    border: 1px solid #ddd;
    border-radius: 3px;
    > * {
      ${({ theme }) => theme.flexCenter};
      text-align: center;
      width: 2rem;
      height: 2rem;
      border: none;
      padding: 0;
    }
  }
  .cart__form--product-price {
    text-align: right;
  }
  .cart__form--checkbox {
    display: none;
    & + .cart__form--myCheck {
      ${({ theme }) => theme.flexCenter};
      font-size: 0.8rem;
      width: 2em;
      height: 2em;
      color: ${({ theme }) => theme.color.borderColor};
      border: 2px solid ${({ theme }) => theme.color.borderColor};
      border-radius: 50%;
      &:hover {
        cursor: pointer;
      }
    }
    &:checked + .cart__form--myCheck {
      border: none;
      background-color: ${({ theme }) => theme.color.baeminPrimary};
      color: white;
    }
  }
  .cart__result {
    ${({ theme }) => theme.flexCenter};
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    > * {
      width: 300px;
      padding: 1rem;
    }
    .cart__result--total-price {
      display: flex;
      justify-content: space-between;
      background-color: #fcfcf7;
      > p:nth-of-type(2) {
        font-family: 'Do Hyeon', sans-serif;
        color: ${({ theme }) => theme.color.baeminPrimary};
      }
    }
    .cart__result--pay-btn {
      font-size: 1.2rem;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.color.baeminDark};
      color: white;
    }
  }
  .cart__img--empty {
    width: 200px;
  }
  button:disabled {
    opacity: 0.3;
    &:hover {
      cursor: unset;
    }
  }
  .cart__content--empty {
    margin: 1rem 0;
    font-family: 'Do Hyeon', sans-serif;
    font-size: 7rem;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .cart__form--content {
      grid-template-columns: repeat(5, 1fr);
      grid-row-gap: 1rem;
      > img {
        width: 100%;
        grid-column-start: 2;
        grid-column-end: 3;
      }
      > a {
        text-align: right;
        grid-column-start: 4;
        grid-column-end: 6;
      }
      .cart__form--product-count {
        grid-column-start: 1;
        grid-column-end: 3;
      }
      .cart__form--product-price {
        grid-column-start: 4;
        grid-column-end: 6;
      }
      .cart__form--delete {
        display: block;
      }
    }
  }
`;
