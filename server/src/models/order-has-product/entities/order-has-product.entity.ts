import { Order } from 'src/models/order/entities/order.entity';
import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderHasProduct {
  @ManyToOne(() => Order, (order) => order.orderHasProducts, { primary: true })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderHasProducts, { primary: true })
  product: Product;

  @Column('int')
  quantity: number;
}
