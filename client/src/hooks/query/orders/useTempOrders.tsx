import { IOrder } from '@types';
import axios from '@utils/axios';
import { useQuery } from 'react-query';

const getMyTempOrders = async (id: string): Promise<IOrder> => {
  const { data } = await axios.get<any>(`http://localhost:8080/api/v1/orders/${id}`, {
    withCredentials: true,
  });
  if (!data) throw new Error('항목이 없습니다');
  return data;
};

export const useTempOrders = (id: string) => {
  return useQuery(['orders', id], () => getMyTempOrders(id));
};
