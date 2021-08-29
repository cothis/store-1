import { Product } from '@models/product/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null, unique: true })
  loginId?: string;

  @Exclude()
  @Column({ type: 'bigint', unsigned: true, nullable: true, default: null })
  oAuthId?: string;

  @Expose({ groups: ['me'] })
  @Column({ default: false })
  isAdmin: boolean;

  // hashed by bcrypt
  @Exclude()
  @Column({ type: 'char', length: 60 })
  password: string;

  @Expose({ groups: ['me'] })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Expose({ name: 'name' })
  @Column({ type: 'varchar', length: 10 })
  realName: string;

  @Expose({ groups: ['me'] })
  @Column({ type: 'char', length: 5 })
  zipcode: string;

  @Expose({ groups: ['me'] })
  @Column({ type: 'text' })
  address: string;

  @Expose({ groups: ['me'] })
  @Column({ type: 'text' })
  addressDetail: string;

  @Expose({ groups: ['me'] })
  @ManyToMany(() => Product, (product) => product.likingUsers)
  @JoinTable({
    name: 'like',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  likes: Product[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
