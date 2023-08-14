// Импортируем функцию `PartialType` из библиотеки '@nestjs/swagger'
// Эта функция используется для создания новых типов на основе существующих,
// делая все их свойства необязательными
import { PartialType } from '@nestjs/swagger';

// Импортируем класс `CreateFileDto` из другого модуля './create-file.dto'
// Этот класс имеет свойства, которые требуются для создания файла
import { CreateFileDto } from './create-file.dto';

// Создаем класс `UpdateFileDto`, который наследует от `CreateFileDto`
// с использованием функции `PartialType`
// Получаемый класс имеет такие же свойства, как `CreateFileDto`, но все
// они являются необязательными. Это позволяет делать частичные обновления
// файлов и устанавливать только те свойства, которые нужно изменить
export class UpdateFileDto extends PartialType(CreateFileDto) {}
