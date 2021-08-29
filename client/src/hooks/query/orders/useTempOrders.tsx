import { CreateOrderDto, IOrder } from '@types';
import { createOrder, fetchMyOrders, fetchMyTempOrders, updateOrder } from '@utils/orders';
import { useMutation, useQuery } from 'react-query';

export const useTempOrders = (id: string) => {
  return useQuery<IOrder>(['orders', id], () => fetchMyTempOrders(id), { retry: false });
};

export const useUpdateOrder = () => {
  return useMutation((order: IOrder) => updateOrder(order));
};

export const useCreateOrder = () => {
  return useMutation((order: CreateOrderDto) => createOrder(order));
};

export const useOrders = (status: string) => {
  return useQuery<IOrder[]>(['orders'], () => fetchMyOrders(status), { retry: false });
};
