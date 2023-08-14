// Импортируем необходимые модули и компоненты
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';

// Определяем модуль 'FilesModule'
@Module({
  // Регистрируем контроллер 'FilesController'
  controllers: [FilesController],
  // Регистрируем сервис 'FilesService'
  providers: [FilesService],
  // Импортируем модуль 'TypeOrmModule' с фичами для 'FileEntity'
  imports: [TypeOrmModule.forFeature([FileEntity])],
})
// Экспортируем класс 'FilesModule'
export class FilesModule {}
