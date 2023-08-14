// Обработка запросов - GET / POST / DELETE / PATCH / PUT ...
// После получения этих данных мы передаем их в "appService"

// Импортируем необходимые декораторы и классы из библиотеки NestJS
import { Controller, Get } from '@nestjs/common';
// Импортируем AppService из файла './app.service'
import { AppService } from './app.service';

// Используем декоратор @Controller() для определения класса как контроллера
@Controller()
export class AppController {
  // Инициализируем экземпляр AppService через внедрение зависимостей
  constructor(private readonly appService: AppService) {}

  // Используем декоратор @Get() для определения метода getHello() как обработчика GET-запросов
  @Get()
  getHello(): string {
    // Вызываем метод getHello() из AppService и возвращаем результат
    return this.appService.getHello();
  }
}
