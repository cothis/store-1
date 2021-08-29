import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

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
    try {
      return await this.userRepository.createEntity({
        ...createUserDto,
        password: createUserDto.password ? await bcrypt.hash(createUserDto.password, 10) : null,
      });
    } catch {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
      });
    }
  }

  async updateEntity(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.updateEntity(id, {
      ...updateUserDto,
      password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, 10) : null,
    });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.userRepository.deleteEntity(id);
  }

  async findByLoginId(loginId: string): Promise<User> {
    return await this.userRepository.findByLoginId(loginId);
  }

  async findByOauthId(id: string): Promise<User> {
    return await this.userRepository.findByOauthId(id);
  }
}
