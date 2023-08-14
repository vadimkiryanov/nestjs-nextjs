import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Инжектирование зависимости UsersService
    private jwtService: JwtService, // Инжектирование зависимости JwtService
  ) {}

  // Проверяет пользователя по электронной почте и паролю
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Находит пользователя по электронной почте с использованием UsersService

    if (user && user.password === password) { // Если пользователь существует и пароль совпадает
      const { password, ...result } = user; // Исключает поле password из результата
      return result; // Возвращает результат
    }

    return null; // Возвращает null, если пользователь не найден или пароль не совпадает
  }

  // Регистрирует нового пользователя
  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto); // Создает нового пользователя с использованием UsersService

      return {
        token: this.jwtService.sign({ id: userData.id }), // Генерирует токен с использованием JwtService и возвращает его
      };
    } catch (err) {
      console.log(err); // Логирует ошибку, если регистрация не удалась
      throw new ForbiddenException('Ошибка при регистрации'); // Выбрасывает ForbiddenException с сообщением об ошибке
    }
  }

  // Авторизует пользователя
  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }), // Генерирует токен с использованием JwtService и возвращает его
    };

  }
}
