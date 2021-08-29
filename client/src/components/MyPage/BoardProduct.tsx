import styled from '@lib/styled-components';
import { IProductListItem } from '@types';
import Link from '@lib/router/Link';

interface IBoardProductsProps {
  product: IProductListItem;
}

export default function BoardProduct({ product }: IBoardProductsProps) {
  return (
    <BoardProductWrapper>
      <img className="board__product--img" src={product.imageUrl} alt={product.title} />
      <Link to={`/products/${product.id}`}>{product.title}</Link>
      {product.price && <p className="board__product--price">{product.price.toLocaleString() + '원'}</p>}
    </BoardProductWrapper>
  );
}

const BoardProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  a {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.5em;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
  .board__product--img {
    width: 100%;
    max-width: 80px;
  }
  .board__product--price {
    grid-column-start: 4;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template-columns: 1fr 2fr 1fr;

    a {
      font-size: 1rem;
      margin-left: 0.5rem;
    }
    .board__product--price {
      grid-column-start: 3;
      font-size: 0.7rem;
    }
  }
`;
