import { Cart } from 'src/models/cart/entities/cart.entity';
import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('cart_has_product')
export class CartHasProduct {
  @ManyToOne(() => Cart, (cart) => cart.cartHasProducts, { primary: true })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartHasProducts, { primary: true })
  product: Product;

  @Column('int')
  quantity: number;
}
