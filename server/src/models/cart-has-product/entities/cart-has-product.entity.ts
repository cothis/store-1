import { Cart } from 'src/models/cart/entities/cart.entity';
import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, OneToMany, RelationId } from 'typeorm';

@Entity('cart_has_product')
export class CartHasProduct {
  @OneToMany(() => Cart, (cart) => cart.cartHasProducts)
  cart: Cart;

  @RelationId((cartHasProduct: CartHasProduct) => cartHasProduct.cart, 'cart_id')
  cartId: string;

  @OneToMany(() => Product, (product) => product.cartHasProducts)
  product: Product;

  @RelationId((cartHasProduct: CartHasProduct) => cartHasProduct.product, 'product_id')
  productId: string;

  @Column('int')
  quantity: number;
}
