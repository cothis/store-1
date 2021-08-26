import useParams from '@hooks/useParams';
import usePath from '@hooks/usePath';
import { useProductList } from '@hooks/query/products';
import ProductList from '@components/ProductList';
import Sort from '@components/Sort';
import Pagination from '@components/Pagination';
import Loading from '@components/Loading';
import styled from '@lib/styled-components';

export default function Category() {
  const { id } = useParams();
  const path = usePath();
  const { isLoading, isError, data, error } = useProductList(path, id);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) throw error;
  if (!data) return <div></div>;

  return (
    <CategoryProductsWrapper>
      <p className="category__total-count">
        총 <span>{data.totalCount}</span> 개
      </p>
      <Sort />
      <ProductList products={data.products}></ProductList>
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
