import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  async updateEntity(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const entity = await this.findById(id);
    return await this.update(id, { ...entity, ...updateUserDto });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }

  async findByLoginId(loginId: string): Promise<User> {
    return await this.findOne({ where: { loginId } });
  }

  async findByOauthId(code: string): Promise<User> {
    return await this.findOne({ where: { oAuthId: code } });
  }
}
