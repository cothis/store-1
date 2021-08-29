import { BoardContent } from '@models/board/entities/board-content.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @Exclude()
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  // board를 구분 짓기 위해서 사용하는 수단
  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('varchar', { length: 45 })
  title: string;

  // 리뷰, 상품문의를 모두 board로 처리하고자 합니다.
  @Exclude()
  @Column()
  forProduct: boolean;

  // 게시판 댓글 기능 여부
  @Exclude()
  @Column()
  commentable: boolean;

  @OneToMany(() => BoardContent, (boardContent) => boardContent.board)
  @JoinColumn()
  contents: BoardContent[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
