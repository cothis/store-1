import { BoardContent } from '@models/board/entities/board-content.entity';
import { Category } from 'src/models/category/entities/category.entity';
import { OrderHasProduct } from 'src/models/order-has-product/entities/order-has-product.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductTag {
  BEST = 'best',
  GREEN = 'green',
  NEW = 'new',
  SALE = 'sale',
  SOLDOUT = 'soldout',
  DISABLED = 'disabled',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_has_category',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column('decimal')
  price: string;

  @Column('decimal')
  originalPrice: string;

  @Column({ type: 'varchar', length: 255 })
  priceText: string;

  @Column('simple-array')
  content: string[];

  @Column({ type: 'set', enum: ProductTag, nullable: true })
  tags: ProductTag[];

  // 리뷰가 될 수도 있고 문의가 될 수도 있고
  @OneToMany(() => BoardContent, (boardContent) => boardContent.product)
  boardContents: BoardContent[];

  @OneToMany(() => OrderHasProduct, (orderHasProduct) => orderHasProduct.product)
  orderHasProducts: OrderHasProduct[];
}
