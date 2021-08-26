import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductBanner {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Exclude()
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({ type: 'bigint', unsigned: true })
  productId: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Exclude()
  @Column({ default: false })
  forSlide: boolean;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
