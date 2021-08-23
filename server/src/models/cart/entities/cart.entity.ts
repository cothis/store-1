import { CartHasProduct } from 'src/models/cart-has-product/entities/cart-has-product.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @OneToMany(() => User, (user) => user.carts)
  user: User;

  @RelationId((cart: Cart) => cart.user, 'user_id')
  userId: string;

  @ManyToOne(() => CartHasProduct)
  cartHasProducts: CartHasProduct[];
}
