import { BoardComment } from '@models/board/entities/board-comment.entity';
import { Board } from '@models/board/entities/board.entity';
import { Product } from '@models/product/entities/product.entity';
import { User } from '@models/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BoardContent {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column('varchar', { length: 45 })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Board, (board) => board.contents)
  @JoinColumn()
  board: Board;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @OneToMany(() => BoardComment, (comment) => comment.boardContent)
  comments: BoardComment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
