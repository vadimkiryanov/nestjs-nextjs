// Импортируем `PartialType` из пакета '@nestjs/mapped-types'
import { PartialType } from '@nestjs/mapped-types';

// Импортируем `CreateUserDto` из файла 'create-user.dto'
import { CreateUserDto } from './create-user.dto';

// Определение класса `UpdateUserDto`, который является частичной версией `CreateUserDto`
// с использованием утилиты `PartialType` из библиотеки Nest.js.
// Таким образом, все свойства из `CreateUserDto` будут опциональными в `UpdateUserDto`,
// что позволяет обновлять только определенные поля пользователя.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
