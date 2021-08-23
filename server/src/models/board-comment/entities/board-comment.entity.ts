import { BoardContent } from 'src/models/board-content/entities/board-content.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity({ name: 'board_comment' })
export class BoardComment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column('text')
  content: string;

  @OneToMany((type) => User, (user) => user.comments)
  user: User;

  @RelationId((boardComment: BoardComment) => boardComment.user, 'user_id')
  userId: string;

  @OneToMany((type) => BoardContent, (boardContent) => boardContent.comments)
  boardContent: BoardContent;

  @RelationId((boardComment: BoardComment) => boardComment.boardContent, 'board_content_id')
  boardContentId: string;
}
