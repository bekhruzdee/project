import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { SanitizePipe } from './common/pipes/sanitize.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Reverse proxy bo‘lsa (production)
  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);

  // 🛡 Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  // 🌍 CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // 🚦 Global rate limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // 🧼 Global Pipes
  app.useGlobalPipes(
    new SanitizePipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
