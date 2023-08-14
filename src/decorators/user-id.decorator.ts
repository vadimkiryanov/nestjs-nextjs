// Импортируем функциональность из Nest.js для создания пользовательских параметрических декораторов
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Создаем `UserId`, который является параметрическим декоратором, его можно будет использовать в контроллерах Nest.js
export const UserId = createParamDecorator(
  // Фабрика декоратора вызывается с двумя аргументами: 1) данные (которые мы не используем), 2) контекст исполнения
  (_: unknown, ctx: ExecutionContext): number | null => {
    // Достаем объект запроса из контекста исполнения
    const request = ctx.switchToHttp().getRequest();

    // Возвращаем ID пользователя из объекта запроса или null, если ID отсутствует.
    // Обратите внимание, что мы преобразуем ID пользователя (если есть) в числовой тип, прежде чем вернуть его.
    return request.user?.id ? Number(request.user.id) : null;
  },
);
