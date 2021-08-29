import { IsNumber } from 'class-validator';
import { Order } from 'src/models/order/entities/order.entity';
import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderHasProduct {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Order, (order) => order.orderHasProducts)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @IsNumber()
  @Column('int')
  quantity: number;
}
