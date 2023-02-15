import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //By importing this, this creates User Repository fo us automatically
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule {}
