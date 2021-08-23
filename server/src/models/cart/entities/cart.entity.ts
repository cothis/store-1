import { CartHasProduct } from 'src/models/cart-has-product/entities/cart-has-product.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => CartHasProduct, (cartHasProduct) => cartHasProduct.cart)
  cartHasProducts: CartHasProduct[];
}
