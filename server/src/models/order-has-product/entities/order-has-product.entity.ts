import { Order } from 'src/models/order/entities/order.entity';
import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, OneToMany, RelationId } from 'typeorm';

@Entity('order_has_product')
export class OrderHasProduct {
  @OneToMany(() => Order, (order) => order.orderHasProducts)
  order: Order;

  @RelationId((orderHasProduct: OrderHasProduct) => orderHasProduct.order, 'order_id')
  orderId: string;

  @OneToMany(() => Product, (product) => product.orderHasProducts)
  product: Product;

  @RelationId((orderHasProduct: OrderHasProduct) => orderHasProduct.product, 'product_id')
  productId: string;

  @Column('int')
  quantity: number;
}
