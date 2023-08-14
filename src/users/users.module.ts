// Импортируемые зависимости
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

// Модуль пользователей
// Модуль определяет контроллеры, провайдеры и зависимости, связанные с управлением пользователями в приложении
@Module({
  // Контроллеры, связанные с данным модулем
  controllers: [UsersController],
  // Сервисы, на которые ссылается данный модуль
  providers: [UsersService],
  // Импортируемые модули, включая настройку TypeOrm для сущности UserEntity
  imports: [TypeOrmModule.forFeature([UserEntity])],
  // Сервисы, экспортируемые данным модулем для использования в других модулях
  exports: [UsersService],
})
export class UsersModule {}
