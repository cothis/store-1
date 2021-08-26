import useParams from '@hooks/useParams';
import usePath from '@hooks/usePath';
import { useProductList } from '@hooks/query/products';
import ProductList from '@components/ProductList';
import Sort from '@components/Sort';
import Pagination from '@components/Pagination';
import Loading from '@components/Loading';
import styled from '@lib/styled-components';
import notify from '@utils/toastify';
import { SEARCH_INPUT_INVALID } from '@constants/message';
import useHistory from '@hooks/useHistory';

export default function Category() {
  const { id } = useParams();
  const path = usePath();
  const history = useHistory();
  const keyword = path.search.keyword;
  if (keyword && (keyword.length < 2 || keyword.length > 20)) {
    notify('error', SEARCH_INPUT_INVALID);
    // TODO: returnRedirect 만들거임
    // history.replace({ pathname: '/' });
    return null;
  }
  const { isLoading, isError, data, error } = useProductList(path, id);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) throw error;
  if (!data) return <div></div>;

  return (
    <CategoryProductsWrapper>
      {path.search.keyword && (
        <h3 className="products__header--text">
          " <span>{path.search.keyword}</span> " 검색 결과
        </h3>
      )}
      {data.categoryName && (
        <h3 className="products__header--text">
          <span>{data.categoryName}</span> 카테고리 결과
        </h3>
      )}
      {!data.categoryName && !path.search.keyword && <h3 className="products__header--text">전체 결과</h3>}
      <p className="products__header--text">
        총 <span>{data.totalCount}</span> 개
      </p>
      {data.products.length ? (
        <>
          <Sort />
          <ProductList products={data.products}></ProductList>
          <Pagination path={path} currentPage={data.currentPage} totalPage={data.totalPage} />
        </>
      ) : (
        <p className="products__content--empty">텅</p>
      )}
    </CategoryProductsWrapper>
  );
}

const CategoryProductsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  .products__header--text {
    margin: 1rem 0;
    > span {
      font-weight: bold;
    }
  }
  h3.products__header--text {
    font-size: 1.2rem;
    > span {
      font-family: 'Do Hyeon', sans-serif;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.color.baeminDark};
    }
  }
  .products__content--empty {
    padding: 0.5em 0;
    ${({ theme }) => theme.flexCenter};
    font-size: 7rem;
    font-family: 'Do Hyeon', sans-serif;
  }
`;
