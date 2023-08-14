import { Injectable } from '@nestjs/common';
// Импортируем декоратор 'Injectable' из @nestjs/common для применения на классе, чтобы класс мог быть управляемым Nest и внедрен в другие классы.

import { AuthGuard } from '@nestjs/passport';
// Импортируем класс 'AuthGuard' из @nestjs/passport для расширения и создания нашего собственного авторизационного сервиса на основе Passport.js.

@Injectable()
// Применяем декоратор 'Injectable', чтобы обозначить класс 'JwtAuthGuard' как управляемый Nest'ом и возможность внедрения его в другие классы в виде зависимости.

export class JwtAuthGuard extends AuthGuard('jwt') {}
// Создаем и экспортируем класс 'JwtAuthGuard', который наследует 'AuthGuard' и передача аргумента 'jwt' при инициализации класса указывает Passport.js использовать стратегию аутентификации JWT (JSON Web Token).