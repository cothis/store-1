import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app.service';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 엔티티 데코레이터에 없는 프로퍼티 값 무시
      forbidNonWhitelisted: true, // 엔티티 데코레이터에 없는 값 들어왔을 때, 에러 메시지 표시
      transform: true, // 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
    }),
  );

  app.enableCors({ credentials: true, origin: true });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    }),
  );

  const appConfig: AppConfigService = app.get(AppConfigService);
  await app.listen(appConfig.port);
}
bootstrap();
