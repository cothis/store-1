import { BoardComment } from 'src/models/board-comment/entities/board-comment.entity';
import { BoardContent } from 'src/models/board-content/entities/board-content.entity';
import { Cart } from 'src/models/cart/entities/cart.entity';
import { Review } from 'src/models/review/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: true, default: null, unique: true })
  loginId?: string;

  @Column({ type: 'bigint', unsigned: true, nullable: true, default: null })
  oAuthId?: string;

  @Column({ default: false })
  isAdmin: boolean;

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

  @ManyToOne(() => BoardContent)
  contents: BoardContent[];

  @ManyToOne(() => BoardComment)
  comments: BoardComment[];

  @ManyToOne(() => Review)
  reviews: Review[];

  @ManyToOne(() => Cart)
  carts: Cart[];
}
