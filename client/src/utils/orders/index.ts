import { IOrder, OrderStatus, CreateOrderDto } from '@types';
import axios from '@utils/axios';

export const fetchMyTempOrders = async (id: string): Promise<IOrder> => {
  const { data } = await axios.get<IOrder>(`/api/v1/orders/${id}`);
  if (!data) throw new Error('항목이 없습니다');
  if (data.status !== OrderStatus.TEMP) throw new Error('잘못된 상태입니다.');
  return data;
};

export const updateOrder = async (order: IOrder) => {
  return axios.put<IOrder>(`/api/v1/orders/${order.id}`, order);
};

export const createOrder = async (order: CreateOrderDto) => {
  return axios.post<{ id: number }>(`/api/v1/orders`, order);
};

export const fetchMyOrders = async (status: string) => {
  const { data } = await axios.get<IOrder[]>(`/api/v1/orders?status=${status}`);
  if (!data) throw new Error('텅 비었다');
  return data;
};
