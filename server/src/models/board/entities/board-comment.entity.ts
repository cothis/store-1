import { BoardContent } from '@models/board/entities/board-content.entity';
import { User } from '@models/users/entities/user.entity';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BoardComment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Exclude()
  @ManyToOne(() => BoardContent, (content) => content.comments)
  @JoinColumn()
  boardContent: BoardContent;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
