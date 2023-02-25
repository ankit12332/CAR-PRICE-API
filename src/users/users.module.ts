import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //By importing this, this creates User Repository fo us automatically
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // }
  ]
})
  export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
