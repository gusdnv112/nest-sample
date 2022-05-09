import { Body, Controller, Get, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
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
  registUser(@Body() user: User): Promise<User> {
    return this.userService.regist(user);
  }

  @Post('/insert')
  insertUser(@Body() user: User): Promise<InsertResult> {
    return this.userService.insert(user);
  }
}
