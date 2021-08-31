import styled from '@lib/styled-components';
import ProductItem from './ProductListItem';
import { IProductListItem } from '@types';

interface ProductListProps {
  products: IProductListItem[];
  withLike?: boolean;
}

function ProductList({ products, withLike = false }: ProductListProps) {
  return (
    <ProductsWrapper>
      {products.map((product) => (
        <ProductItem product={product} withLike={withLike} key={product.id} />
      ))}
    </ProductsWrapper>
  );
}

const ProductsWrapper = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.media.medium}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.media.mobileSmall}) {
    grid-template-columns: 1fr;
  }
`;

export default ProductList;
