import { Product } from '@models/product/entities/product.entity';
import { Entity, CreateDateColumn, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.likes)
  @JoinColumn()
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
