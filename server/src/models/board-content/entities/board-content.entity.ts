import { BoardComment } from 'src/models/board-comment/entities/board-comment.entity';
import { Board } from 'src/models/board/entities/board.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board_content')
export class BoardContent {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column({ type: 'varchar', length: 45 })
  content: string;

  @ManyToOne(() => Board)
  board: Board;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => BoardComment, (boardComment) => boardComment.boardContent)
  comments: BoardComment[];
}
