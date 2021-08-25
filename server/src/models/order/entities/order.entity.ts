import { OrderHasProduct } from 'src/models/order-has-product/entities/order-has-product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  TEMP = 'temp',
  READY = 'ready',
  ACCEPTED = 'accepted',
  DELIVERING = 'delivering',
  DONE = 'done',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.READY })
  status: OrderStatus;

  @OneToMany(() => OrderHasProduct, (orderhasProduct) => orderhasProduct.order)
  orderHasProducts: OrderHasProduct[];
}
