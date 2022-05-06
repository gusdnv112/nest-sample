import { Controller, Get, Post } from '@nestjs/common';
import { User } from './dto/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  registUser(user: User): Promise<User> {
    return this.userService.regist(user);
  }
}
