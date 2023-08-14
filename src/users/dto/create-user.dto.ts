// Импорт декоратора ApiProperty из библиотеки NestJS Swagger
import { ApiProperty } from '@nestjs/swagger';

// Определение класса CreateUserDto,
// который используется для передачи данных о новом пользователе
export class CreateUserDto {
  // Добавление метаданных Swagger к свойству email с значением по умолчанию
  @ApiProperty({
    default: 'test@email.com',
  })
  email: string; // Свойство email с типом `string`

  // Добавление метаданных Swagger к свойству fullName с значением по умолчанию
  @ApiProperty({
    default: 'Jhon Doe',
  })
  fullName: string; // Свойство fullName с типом `string`

  // Добавление метаданных Swagger к свойству password с значением по умолчанию
  @ApiProperty({
    default: 'testpass',
  })
  password: string; // Свойство password с типом `string`
}
