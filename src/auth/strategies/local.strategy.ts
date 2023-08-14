// Импортируем стратегию локальной аутентификации из пакета passport-local
import { Strategy } from 'passport-local';

// Импортируем "PassportStrategy" из NestJS Passport для создания пользовательской стратегии аутентификации
import { PassportStrategy } from '@nestjs/passport';

// Импортируем Injectable и UnauthorizedException из пакета @nestjs/common
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Импортируем AuthService для проверки пользователя
import { AuthService } from '../auth.service';

// Создаем класс "LocalStrategy", который наследует "PassportStrategy" и использует стратегию из "passport-local"
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // В конструктор класса передается сервис AuthService
  constructor(private authService: AuthService) {
    // Вызываем "super()" и задаем параметры конфигурации для стратегии "passport-local", устанавливаем поле "email" в качестве идентификатора пользователя
    super({
      usernameField: 'email',
    });
  }

  // Метод "validate" используется для проверки пользовательских данных (в данном случае, email и пароль)
  async validate(email: string, password: string): Promise<any> {
    // Вызываем метод "validateUser" из AuthService для проверки пользователя по email и паролю
    const user = await this.authService.validateUser(email, password);

    // Если пользователь не найден или предоставлены некорректные данные, выбрасываем исключение "UnauthorizedException"
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // Если пользователь успешно прошел проверку, возвращаем объект пользователя
    return user;
  }
}
