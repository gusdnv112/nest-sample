import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TerraController } from './terra/terra.controller';
import { TerraService } from './terra/terra.service';
import { TerraModule } from './terra/terra.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, TerraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
