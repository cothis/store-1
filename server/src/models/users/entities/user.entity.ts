import { Product } from '@models/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null, unique: true })
  loginId?: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true, default: null })
  oAuthId?: string;

  @Column({ default: false })
  isAdmin: boolean;

  // hashed by bcrypt
  @Column({ type: 'char', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  realName: string;

  @Column({ type: 'char', length: 5 })
  zipcode: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  addressDetail: string;

  @ManyToMany(() => Product, (product) => product.likingUsers)
  @JoinTable({
    name: 'like',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  likes: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
