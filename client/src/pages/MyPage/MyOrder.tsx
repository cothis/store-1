import Loading from '@components/Loading';
import OrderStatusSelector from '@components/MyPage/OrderStatusSelector';
import OrderPreview from '@components/Order/OrderPreview';
import Pagination from '@components/Pagination';
import { LOGIN_REQUIRED } from '@constants/message';
import { useOrders } from '@hooks/query/orders/useTempOrders';
import usePath from '@hooks/usePath';
import Redirect from '@lib/router/Redirect';
import styled from '@lib/styled-components';
import { OrderStatus } from '@types';
import notify from '@utils/toastify';
import { toAvailablePriceText, toPriceText } from '@utils/toPriceText';
import axios from 'axios';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Container, TitleWithBorder } from './my-page-style';

export default function MyOrder() {
  const path = usePath();
  const page = +path.search.page || 1;
  const status = path.search.status || OrderStatus.NULL;
  const { isLoading, data, isError, error } = useOrders(status, page);

  if (isLoading) {
    return (
      <Container>
        <TitleWithBorder>내 주문목록</TitleWithBorder>
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
      <TitleWithBorder>내 주문목록</TitleWithBorder>
      <OrderStatusSelector />

      {data.orders.length ? (
        <>
          <OrderList>
            {data.orders.map((order) => (
              <OrderPreview key={order.id} order={order} />
            ))}
          </OrderList>
          <Pagination path={path} currentPage={page} totalPage={data.page.totalPage} link />
        </>
      ) : (
        <p className="products__content--empty">텅</p>
      )}
    </Container>
  );
}

const OrderList = styled.div``;
