import { BoardContent } from 'src/models/board-content/entities/board-content.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';

@Entity({ name: 'board' })
export class Board implements IBoard {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => BoardContent)
  contents: BoardContent[];
}
