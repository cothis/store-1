import Link from '@lib/router/Link';
import styled from '@lib/styled-components';
import { IOrderHasProduct } from '@types';

interface OrderPreviewProductProps {
  orderProduct: IOrderHasProduct;
}

export default function OrderPreviewProduct({ orderProduct }: OrderPreviewProductProps) {
  const { product } = orderProduct;
  return (
    <BoardProductWrapper>
      <img className="product--img" src={product.imageUrl} alt={product.title} />
      <Link to={`/products/${product.id}`}>{product.title}</Link>
      <p className="product--quantity">{orderProduct.quantity.toLocaleString() + '개'}</p>
      <p className="product--unit-price">{product.price!.toLocaleString() + '원'}</p>
      <p className="product--total-price">{(product.price! * orderProduct.quantity).toLocaleString() + '원'}</p>
    </BoardProductWrapper>
  );
}

const BoardProductWrapper = styled.div`
  display: grid;
  grid-template: 'image title quantity unit-price total-price' auto / 1fr 4fr 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;

  .product--img {
    grid-area: image;
    width: 100%;
    max-width: 80px;
  }
  a {
    grid-area: title;
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.5em;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }

  .product--quantity {
    grid-area: quantity;
  }
  .product--unit-price {
    grid-area: unit-price;
  }
  .product--total-price {
    justify-self: end;
    grid-area: total-price;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template:
      'image title quantity' auto
      'image title unit-price' auto
      'image title total-price' auto / 1fr 2fr 1fr;

    a {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    .product--quantity,
    .product--unit-price,
    .product--total-price {
      justify-self: center;
    }
  }
`;
