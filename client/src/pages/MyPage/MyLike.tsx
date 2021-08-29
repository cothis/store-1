import Loading from '@components/Loading';
import Pagination from '@components/Pagination';
import ProductList from '@components/ProductList';
import { LOGIN_REQUIRED } from '@constants/message';
import { useUserLikes } from '@hooks/query/users';
import usePath from '@hooks/usePath';
import Redirect from '@lib/router/Redirect';
import styled from '@lib/styled-components';
import notify from '@utils/toastify';
import axios from 'axios';
import { TitleWithBorder } from './my-page-style';

export default function MyLike() {
  const path = usePath();
  const page = +path.search.page || 1;
  const { isLoading, data, isError, error } = useUserLikes(page);

  if (isLoading) {
    return (
      <Container>
        <TitleWithBorder>내가 좋아한 상품</TitleWithBorder>
        <Loading />
      </Container>
    );
  }
  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      notify('error', LOGIN_REQUIRED);
      return <Redirect to={{ pathname: '/signin', search: { redirect: path.pathname } }} />;
    }
    throw error;
  }
  if (!data) return <div></div>;

  return (
    <Container>
      <TitleWithBorder>내가 좋아한 상품</TitleWithBorder>
      {data.products.length ? (
        <>
          <ProductList products={data.products} withLike={true} />
          <Pagination path={path} currentPage={data.currentPage} totalPage={data.totalPage} link />
        </>
      ) : (
        <p className="products__content--empty">텅</p>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;

  .products__content--empty {
    padding: 0.5em 0;
    ${({ theme }) => theme.flexCenter};
    font-size: 7rem;
    font-family: 'Do Hyeon', sans-serif;
  }
`;
