import { Order } from 'src/models/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// typeorm enum 사용 시 같은 파일 내에 있어야 함. 공식문서로는 못찾았지만, 해보니까 다른파일에서 임포트하는거는 인식하지 못함
export enum OrderStatus {
  READY = 'ready',
  ACCEPTED = 'accepted',
  DELIVERING = 'delivering',
  DONE = 'done',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}
@Entity('order_history')
export class OrderHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Order, (order) => order.orderHistories)
  order: Order;

  @Column({ type: 'enum', enum: OrderStatus, nullable: true })
  prev: OrderStatus;

  @Column({ type: 'enum', enum: OrderStatus, nullable: true })
  next: OrderStatus;
}
