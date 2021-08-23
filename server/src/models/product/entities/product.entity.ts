import { CartHasProduct } from 'src/models/cart-has-product/entities/cart-has-product.entity';
import { Category } from 'src/models/category/entities/category';
import { OrderHasProduct } from 'src/models/order-has-product/entities/order-has-product.entity';
import { Review } from 'src/models/review/entities/review.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductTag {
  BEST = 'best',
  GREEN = 'green',
  NEW = 'new',
  SALE = 'sale',
  SOLDOUT = 'soldout',
  DISABLED = 'disabled',
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_has_category',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'text', nullable: true })
  thumbnails: string;

  @Column('decimal')
  price: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'enum', enum: ProductTag, nullable: true, array: true })
  tags: ProductTag[];

  @ManyToOne(() => Review)
  reviews: Review[];

  @ManyToOne(() => OrderHasProduct)
  orderHasProducts: OrderHasProduct[];

  @ManyToOne(() => CartHasProduct)
  cartHasProducts: CartHasProduct[];
}
