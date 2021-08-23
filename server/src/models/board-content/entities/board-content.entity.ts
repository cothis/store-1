import { BoardComment } from 'src/models/board-comment/entities/board-comment.entity';
import { Board } from 'src/models/board/entities/board.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity('board_content')
export class BoardContent {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @Column({ type: 'varchar', length: 45 })
  content: string;

  @OneToMany(() => Board, (board) => board.contents)
  board: Board;

  @RelationId((boardContent: BoardContent) => boardContent.board, 'board_id')
  boardId: string;

  @OneToMany(() => User, (user) => user.contents)
  user: User;

  @RelationId((boardContent: BoardContent) => boardContent.user, 'user_id')
  userId: string;

  @ManyToOne(() => BoardComment)
  comments: BoardComment[];
}
