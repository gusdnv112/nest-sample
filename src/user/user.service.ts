import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './dto/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async regist(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async insert(user: User): Promise<InsertResult> {
    const result = await this.userRepository.insert(user);
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
