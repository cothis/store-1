import { Order } from '../entities/order.entity';

export class OrderWithPage {
  orders: Order[];
  page: {
    count: number;
    totalPage: number;
  };
}
