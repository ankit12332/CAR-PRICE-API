import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['abcdeffas']
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  app.enableCors({credentials: true, origin: "http://localhost:3001"});
  await app.listen(3000);
}
bootstrap();
