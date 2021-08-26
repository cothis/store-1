import { User } from '@models/users/entities/user.entity';
import { OrderHasProduct } from './order-has-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'varchar', length: 30 })
  senderName: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  senderCall: string;

  @Column({ type: 'varchar', length: 20 })
  senderPhone: string;

  @Column({ type: 'varchar', length: 50 })
  senderMail: string;

  @Column({ type: 'varchar', length: 30 })
  receiverName: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  receiverCall: string;

  @Column({ type: 'varchar', length: 20 })
  receiverPhone: string;

  @Column({ type: 'char', length: 5 })
  zipcode: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text', nullable: true })
  addressDetail: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @OneToMany(() => OrderHasProduct, (orderhasProduct) => orderhasProduct.order)
  orderHasProducts: OrderHasProduct[];

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @RelationId((order: Order) => order.user)
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
