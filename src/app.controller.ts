// Обработка запросов - GET / POST / DELETE / PATCH / PUT ...
// После получения этих данных мы передаем их в "appService"

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
