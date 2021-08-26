import { OrderHasProduct } from './order-has-product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.TEMP })
  status: OrderStatus;

  @OneToMany(() => OrderHasProduct, (orderHasProduct) => orderHasProduct.order)
  orderHasProducts: OrderHasProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
