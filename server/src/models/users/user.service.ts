import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async createEntity(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createEntity(createUserDto);
  }

  async updateEntity(id: string, user: User): Promise<User> {
    return await this.userRepository.updateEntity(id, user);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.userRepository.deleteEntity(id);
  }
}
