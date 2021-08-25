import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Category, (category) => category.children, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @ManyToMany(() => Product, (products) => products.categories)
  products: Product[];
}
