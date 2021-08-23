import { Product } from 'src/models/product/entities/product.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'text', nullable: true })
  images: string;
}
