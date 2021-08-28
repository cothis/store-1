import { IOrder } from '@types';
import { fetchMyTempOrders, updateOrder } from '@utils/orders';
import { useMutation, useQuery } from 'react-query';

export const useTempOrders = (id: string) => {
  return useQuery<IOrder>(['orders', id], () => fetchMyTempOrders(id), { retry: false });
};

export const useUpdateOrder = () => {
  return useMutation((order: IOrder) => updateOrder(order));
};
