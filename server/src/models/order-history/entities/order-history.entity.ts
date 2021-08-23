import { Order, OrderStatus } from 'src/models/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('order_history')
export class OrderHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @OneToMany(() => Order, (order) => order.orderHistories)
  order: Order;

  @RelationId((orderHistory: OrderHistory) => orderHistory.order, 'order_id')
  orderId: string;

  @Column({ type: 'enum', enum: OrderStatus, nullable: true })
  prev: OrderStatus;

  @Column({ type: 'enum', enum: OrderStatus, nullable: true })
  next: OrderStatus;
}
