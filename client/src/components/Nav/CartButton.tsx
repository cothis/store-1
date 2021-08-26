import useLocalStorage from '@hooks/useLocalStorage';
import NavLink from '@lib/router/NavLink';
import { ICart } from '@types';

export default function CartButton() {
  const [cart, setCart] = useLocalStorage<ICart[]>('cart', []);

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
