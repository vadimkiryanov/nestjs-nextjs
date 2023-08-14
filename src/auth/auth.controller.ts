// Импортируем нужные декораторы и классы из NestJS и наших модулей
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

// Контроллер для работы с аутентификацией
@Controller('auth')
export class AuthController {
  // Внедрение зависимостей для сервиса аутентификации
  constructor(private readonly authService: AuthService) {}

  // Авторизует пользователя
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // Описываем requestBody для OpenAPI (Swagger)
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    // Вызываем метод login сервиса аутентификации с пользовательскими данными
    return this.authService.login(req.user as UserEntity);
  }

  // Регистрирует нового пользователя
  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    // Вызываем метод register сервиса аутентификации с DTO для создания нового пользователя
    return this.authService.register(dto);
  }
}
