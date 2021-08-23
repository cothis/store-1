import { Product } from 'src/models/product/entities/product.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @OneToMany(() => Product, (product) => product.reviews)
  product: Product;

  @RelationId((review: Review) => review.product, 'review_id')
  reviewId: string;

  @OneToMany(() => User, (user) => user.reviews)
  user: User;

  @RelationId((review: Review) => review.user)
  userId: string;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'text', nullable: true })
  images: string;
}
