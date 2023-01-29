import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //By importing this, this creates User Repository fo us automatically
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
