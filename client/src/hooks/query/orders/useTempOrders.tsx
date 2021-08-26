import { IOrder } from '@types';
import axios from 'axios';
import { useQuery } from 'react-query';

const getMyTempOrders = async (): Promise<IOrder[]> => {
  const { data } = await axios.get(`http://localhost:8080/api/v1/orders?status=temp`, { withCredentials: true });
  return data;
};

export const useTempOrders = () => {
  return useQuery(['temp-orders'], getMyTempOrders);
};
