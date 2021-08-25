import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardRepository {
  constructor(private connection: Connection) {}
}
