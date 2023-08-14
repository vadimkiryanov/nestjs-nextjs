// Импортируем используемые декораторы и классы из библиотеки NestJS
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
// Импортируем сервис UsersService
import { UsersService } from './users.service';
// Импортируем DTO для создания и обновления пользователей
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Импортируем декораторы Swagger API
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// Импортируем guard для аутентификации через JWT
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// Импортируем декоратор для извлечения id пользователя из JWT токена
import { UserId } from 'src/decorators/user-id.decorator';

// Создаем контроллер Users с маршрутами, связанными с пользователями
@Controller('users')
// Добавляем Swagger тег "users" для этого контроллера
@ApiTags('users')
// Указываем, что для всех маршрутов этого контроллера требуется аутентификация
@ApiBearerAuth()
export class UsersController {
  // Внедряем зависимость UsersService в контроллер
  constructor(private readonly usersService: UsersService) {}

  // Определяем маршрут POST /users для создания пользователя
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Вызываем метод create сервиса UsersService с переданным DTO
    return this.usersService.create(createUserDto);
  }

  // Определяем маршрут GET /users/me для получения информации о текущем пользователе
  @Get('/me')
  // Гарантируем, что пользователь аутентифицирован с помощью JWT
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number) {
    // Вызываем метод findById сервиса UsersService с переданным id
    return this.usersService.findById(id);
  }
}
