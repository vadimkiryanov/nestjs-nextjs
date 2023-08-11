// Импортируем необходимые модули и зависимости
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

// Определяем асинхронную функцию bootstrap
async function bootstrap() {
  // Создаем экземпляр приложения Nest с конфигурацией CORS (отключено)
  const app = await NestFactory.create(AppModule, { cors: false });

  // Включаем CORS-поддержку с передачей учетных данных и разрешением любого источника
  app.enableCors({ credentials: true, origin: true });

  // Настраиваем путь для обслуживания статических файлов (например, загруженных файлов)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Создаем и настраиваем экземпляр Swagger
  const config = new DocumentBuilder()
    .setTitle('Storage on clouds') // Задаем название API
    .setDescription('The Storage on clouds API description') // Добавляем описание API
    .setVersion('1.0') // Указываем версию API
    // .addTag('storage') // (Закомментировано) Можно добавить метки, чтобы лучше организовать документацию
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config); // Создаем документ Swagger с предоставленной конфигурацией
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }); // Настраиваем маршрут для API документации (/swagger)

  // Запускаем приложение и начинаем слушать на порту 7777
  await app.listen(7777);
}

// Запускаем основную функцию
bootstrap();
