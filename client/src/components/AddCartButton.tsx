import useLocalStorage from '@hooks/useLocalStorage';
import { ICart } from '@types';
import ButtonPrev from './common/ButtonPrev';
import notify from '@utils/toastify';
import { SUCCESS_ADD_CART } from '@constants/message';

const AddCartButton = function ({ id, title, imageUrl, price, originalPrice, count }: ICart) {
  const [cart, setCart] = useLocalStorage<ICart[]>('cart', []);
  const addCart = () => {
    const cartIds = cart.map((product) => product.id);
    if (cartIds.includes(id)) {
      const newCart = cart.map((product) => {
        if (product.id === id) return { ...product, count: product.count + count };
        return product;
      });
      setCart(newCart);
    } else {
      const newCart = [...cart, { id, title, imageUrl, price, originalPrice, count }];
      setCart(newCart);
    }
    notify('success',SUCCESS_ADD_CART(title, count))
  };
  return <ButtonPrev clickHandler={addCart} text="장바구니" />;
};

export default AddCartButton;
