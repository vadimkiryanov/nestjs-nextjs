// Импортируем декоратор Injectable из @nestjs/common. Он используется для создания
// сервисов, которые могут быть внедрены в зависимости (dependency injection)
import { Injectable } from '@nestjs/common';

// Импортируем базовый класс AuthGuard из @nestjs/passport. Этот класс будет
// расширен для создания нашей кастомной стратегии аутентификации.
import { AuthGuard } from '@nestjs/passport';

// Декоратор Injectable указывает, что данный класс может быть внедрен в другие
// классы в качестве зависимости.
@Injectable()
// Создаем класс LocalAuthGuard, который наследует базовый класс AuthGuard и
// принимает строку-ключ стратегии ('local') в своем конструкторе. Это означает,
// что данный класс реализует аутентификацию с использованием локальной стратегии.
export class LocalAuthGuard extends AuthGuard('local') {}
