import { OrderHasProduct } from 'src/models/order-has-product/entities/order-has-product.entity';
import { OrderHistory } from 'src/models/order-history/entities/order-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  READY = 'ready',
  ACCEPTED = 'accepted',
  DELIVERING = 'delivering',
  DONE = 'done',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.READY })
  status: OrderStatus;

  @OneToMany(() => OrderHasProduct, (orderhasProduct) => orderhasProduct.order)
  orderHasProducts: OrderHasProduct[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];
}
