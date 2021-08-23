import { Product } from 'src/models/product/entities/product.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @ManyToOne(() => Category, (category) => category.id, { nullable: true })
  parent: Category;

  @RelationId((category: Category) => category.id, 'parent_id')
  parentId: string;

  @OneToMany(() => Category, (category) => category.id)
  children: Category[];

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @ManyToMany(() => Product, (products) => products.categories)
  products: Product[];
}
