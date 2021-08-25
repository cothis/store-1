import useLocalStorage from '@hooks/useLocalStorage';
import NavLink from '@lib/router/NavLink';
import { ICart } from '@types';
import { useEffect } from 'react';

// 목업
import productOneThumb from '@assets/images/product_one.png';

export default function CartButton() {
  const [cart, setCart] = useLocalStorage<ICart[]>('cart', []);

  // 목업 데이터 설정
  useEffect(() => {
    setCart(cartMockup);
  }, []);

  return (
    <button className="basket">
      <NavLink to="/cart">
        <i className="fas fa-shopping-cart"></i>
        {cart.length > 0 && (
          <div className="cart-length">
            <p>{cart.length}</p>
          </div>
        )}
      </NavLink>
    </button>
  );
}

// 목업용 데이터
const cartMockup: ICart[] = [
  {
    thumb: productOneThumb,
    id: '1',
    title: '잘나가요 세트',
    price: 15000,
    count: 2,
  },
  {
    thumb: productOneThumb,
    id: '2',
    title: '잘나가요 세트',
    price: 15000,
    count: 1,
  },
  {
    thumb: productOneThumb,
    id: '3',
    title: '잘나가요 세트',
    price: 5000,
    count: 3,
  },
];
