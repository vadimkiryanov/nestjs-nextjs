// Импортируем JwtService для работы с JSON Web Tokens
import { JwtService } from '@nestjs/jwt';

// Этот модуль создает связь между контроллером и сервисом

// Импортируем необходимые модули из NestJS
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// Импортируем сущности UserEntity и FileEntity
import { UserEntity } from './users/entities/user.entity';
import { FileEntity } from './files/entities/file.entity';

// Импортируем модуль ConfigModule для работы с конфигурацией приложения
import { ConfigModule } from '@nestjs/config';

// Импортируем модуль AuthModule для работы с аутентификацией
import { AuthModule } from './auth/auth.module';

// Импортируем сервис AuthService для работы с аутентификацией и авторизацией
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Добавляем поддержку TypeORM, указываем параметры подключения к базе данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, FileEntity], // Добавляем существующие сущности
      synchronize: true,
    }),
    UsersModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  // Указываем сервисы, которые будут использоваться в проекте
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
