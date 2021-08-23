import useParams from '@hooks/useParams';
import usePath from '@hooks/usePath';
import { useProductList } from '@hooks/query/products';
import ProductList from '@components/ProductList';
import Sort from '@components/Sort';
import Pagination from '@components/Pagination';
import styled from '@lib/styled-components';

// 목업용
import productThumbOne from '@assets/images/product_one.png';
import productThumbTwo from '@assets/images/product_two.png';
import productThumbThree from '@assets/images/product_three.jpeg';
const images = [productThumbOne, productThumbTwo, productThumbThree];

export default function Category() {
  const { id } = useParams();
  const path = usePath();
  const { isLoading, isError, data, error } = useProductList(path, id);
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) throw error;
  if (!data) return <div></div>;

  // mockup 용 입니다.. 이 후 API 연동 시 data.products를 전달하면 됩니다.
  const products = data.products.map((product, idx) => {
    const mockProduct = Object.assign({}, product);
    mockProduct.imageUrl = images[idx % 3];
    return mockProduct;
  });

  return (
    <CategoryProductsWrapper>
      <p className="category__total-count">
        총 <span>{data.totalCount}</span> 개
      </p>
      <Sort />
      <ProductList products={products}></ProductList>
      <Pagination path={path} currentPage={data.currentPage} totalPage={data.totalPage} />
    </CategoryProductsWrapper>
  );
}

const CategoryProductsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  .category__total-count {
    margin: 1rem 0;
    > span {
      font-weight: bold;
    }
  }
`;
