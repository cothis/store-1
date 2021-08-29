import { Like } from '@/models/users/entities/like.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Category } from 'src/models/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductTag } from '../enums/product-tag.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Exclude()
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_has_category',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Expose({ name: 'imageUrl' })
  @Column({ type: 'text' })
  image: string;

  @Column('int', { nullable: true, unsigned: true })
  price?: number;

  @Column('int', { nullable: true, unsigned: true })
  originalPrice?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  priceText?: string;

  @Column({ type: 'set', enum: ProductTag, default: [] })
  tags: ProductTag[];

  @Expose({ groups: ['detail'] })
  @Column('simple-array')
  content: string[];

  @Expose({ groups: ['detail'] })
  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_has_recommend_product',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'recommend_product_id' },
  })
  recommends: Product[];

  @Exclude()
  @Column('int', { unsigned: true, default: 0 })
  viewCount: number;

  @Expose({ name: 'like' })
  @Transform(({ value }) => value?.length > 0)
  @OneToMany(() => Like, (like) => like.product)
  likes: Like[];

  @Expose({ groups: ['detail'] })
  @Column('simple-json', { nullable: true })
  detailInfo?: [string, string][];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
