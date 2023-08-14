import { Injectable } from '@nestjs/common';

// Декоратор Injectable указывает, что этот класс является сервисом, который может быть внедрен в другие классы в приложении NestJS.
@Injectable()
export class AppService {
// Метод getHello возвращает строку 'Привет мир!'.
getHello(): string {
return 'Привет мир!'; // Возвращает строку, содержащую приветствие.
}
}