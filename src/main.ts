// Главный файл, который запускает весь сервер

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false }); // Отключение cors

  app.enableCors({ credentials: true, origin: true });

  const config = new DocumentBuilder()
    .setTitle('Storage on clouds')
    .setDescription('The Storage on clouds API description')
    .setVersion('1.0')
    // .addTag('storage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // api ==> swagger

  await app.listen(7777);
}
bootstrap();
