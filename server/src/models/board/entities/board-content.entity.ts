import { BoardComment } from '@models/board/entities/board-comment.entity';
import { Board } from '@models/board/entities/board.entity';
import { Product } from '@models/product/entities/product.entity';
import { User } from '@models/users/entities/user.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
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

  @Exclude()
  @ManyToOne(() => Board, (board) => board.contents)
  @JoinColumn()
  board: Board;

  @Expose({ name: 'userName' })
  @Transform(({ value }) => value?.realName)
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Expose({ groups: ['product'] })
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Expose({ name: 'comment', groups: ['comment'] })
  @Transform(({ value }) => value[0]?.content)
  @OneToMany(() => BoardComment, (comment) => comment.boardContent)
  comments: BoardComment[];

  @Expose({ name: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
