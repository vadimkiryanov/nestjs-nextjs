// Импортируем декораторы и зависимости от библиотеки 'typeorm'
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Импортируем сущность UserEntity
import { UserEntity } from '../../users/entities/user.entity';

// Объявляем перечисление FileType для определения типов файлов
export enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

// Используем декоратор Entity для создания таблицы `files` в базе данных
@Entity('files')
export class FileEntity {
  // Используем декоратор PrimaryGeneratedColumn для генерации первичного ключа (id) в таблице
  @PrimaryGeneratedColumn()
  id: number;

  // Используем декоратор Column для создания столбца `filename` в таблице
  @Column()
  filename: string;

  // Используем декоратор Column для создания столбца `originalName` в таблице
  @Column()
  originalName: string;

  // Используем декоратор Column для создания столбца `size` в таблице
  @Column()
  size: number;

  // Используем декоратор Column для создания столбца `mimetype` в таблице
  @Column()
  mimetype: string;

  // Используем декоратор ManyToOne для связи между файлами и пользователями.
  // Это создаст внешний ключ `user` c ссылкой на запись пользователя.
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  // Используем декоратор DeleteDateColumn для создания столбца `deletedAt` в таблице.
  // Этот столбец будет хранить дату удаления файла, если файл удален.
  @DeleteDateColumn()
  deletedAt?: Date;
}
