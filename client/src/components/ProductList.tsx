import styled from '@lib/styled-components';
import ProductItem, { ProductListItem } from './ProductListItem';

function ProductList({ products }: { products: ProductListItem[] }) {
  return (
    <ProductsWrapper>
      {products.map((product, idx) => (
        <ProductItem product={product} key={idx} />
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
