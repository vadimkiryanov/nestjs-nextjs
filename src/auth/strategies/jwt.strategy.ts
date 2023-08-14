// Импорт необходимых зависимостей и библиотек
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

// Создание Injectable класса JwtStrategy, наследующего PassportStrategy (содержит проверки и настроек аутентификации)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Объявление конструктора, который принимает userService для работы с пользователями
  constructor(private readonly userService: UsersService) {
    super({
      // Получение JWT из заголовка запроса
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Указание, что срок действия JWT не должен игнорироваться
      ignoreExpiration: false,
      // Установка секретного ключа для проверки подписи JWT
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  // Метод `validate`, который вызывается после успешной аутентификации для валидации пользовательских данных
  async validate(payload: { id: string }) {
    // Поиск пользователя по ID, полученному из полезной нагрузки JWT
    const user = await this.userService.findById(+payload.id);

    // Если пользователь не найден, генерируем исключение с сообщением об отсутствии доступа
    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }

    // Если все успешно, возвращаем объект с ID пользователя
    return {
      id: user.id,
    };
  }
}
