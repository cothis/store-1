import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll(): Promise<User[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<User> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createUserDto: CreateUserDto): Promise<User> {
    return await this.save(createUserDto);
  }

  async updateEntity(id: string, user: User): Promise<User> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...user });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
