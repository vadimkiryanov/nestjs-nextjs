// Импортируем необходимые модули и компоненты
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

// Модуль аутентификации
@Module({
  imports: [
    // Регистрируем JwtModule с асинхронным провайдером конфигурации
    JwtModule.registerAsync({
      imports: [ConfigModule], // Импортируем ConfigModule для доступа к конфигурации
      inject: [ConfigService], // Внедряем ConfigService для чтения конфигурации
      useFactory: async (configService: ConfigService) => {
        return {
          // Получаем секретный ключ из конфигурации и добавляем его в настройки JwtModule
          secret: configService.get('SECRET_KEY'),
          // Устанавливаем настройки подписи JWT токена (срок действия) из конфигурации
          signOptions: { expiresIn: configService.get('EXPIRES_IN') }, 
        };
      },
    }),
    UsersModule, // Импортируем UsersModule для работы с пользователями
    PassportModule, // Импортируем PassportModule для поддержки аутентификации
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Регистрируем сервисы и стратегии аутентификации
  controllers: [AuthController], // Регистрируем контроллер аутентификации
})
export class AuthModule {} // Экспортируем модуль аутентификации
