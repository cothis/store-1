import { User } from '@models/users/entities/user.entity';
import { OrderHasProduct } from './order-has-product.entity';
import {
  AfterLoad,
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
import { OrderStatus } from '../enums/order-status.enum';
import { IsEnum, IsString } from 'class-validator';
interface AA {
  number: number;
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @IsEnum(OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.TEMP })
  status: OrderStatus;

  @IsString()
  @Column({ type: 'varchar', length: 30, nullable: true })
  senderName?: string;

  @IsString()
  @Column({ type: 'varchar', length: 30, nullable: true })
  senderCall?: string;

  @IsString()
  @Column({ type: 'varchar', length: 20, nullable: true })
  senderPhone?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  senderMail?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  receiverName?: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  receiverCall?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  receiverPhone?: string;

  @Column({ type: 'char', length: 5, nullable: true })
  zipcode?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  addressDetail?: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @OneToMany(() => OrderHasProduct, (orderhasProduct) => orderhasProduct.order, { eager: true })
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

  /* 비즈니스 컬럼 */
  productsPrice: number;
  deliveryFee: number;
  paymentPrice: number;

  @AfterLoad()
  setPrices = () => {
    this.productsPrice = this.calculateProductPrice(this.orderHasProducts);
    this.deliveryFee = 2500;
    this.paymentPrice = this.productsPrice + this.deliveryFee;
  };

  calculateProductPrice = (orderHasProducts: OrderHasProduct[]) => {
    return orderHasProducts?.reduce<number>(
      (price, { product }) => (price += product.price || product.originalPrice || 0),
      0,
    );
  };
}
