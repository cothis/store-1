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

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column('int')
  quantity: number;
}
