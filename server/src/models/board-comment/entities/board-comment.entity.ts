import { BoardContent } from 'src/models/board-content/entities/board-content.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board_comment' })
export class BoardComment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column('text')
  content: string;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne(() => BoardContent)
  boardContent: BoardContent;
}
