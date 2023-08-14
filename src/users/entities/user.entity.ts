// Импортируем FileEntity из соответствующего файла
import { FileEntity } from 'src/files/entities/file.entity';

// Импортируем необходимые декораторы из библиотеки TypeORM для определения сущностей, колонок и связей
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Используем декоратор @Entity для самой сущности, указываем имя таблицы 'users'
@Entity('users')
// Создаем класс UserEntity для представления сущности пользователя и его схемы в БД
export class UserEntity {
  // Определяем id как автоматически генерируемый первичный ключ
  @PrimaryGeneratedColumn()
  id: number;

  // Определяем поля email, password и fullName как столбцы таблицы
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  // Используем декоратор @OneToMany для создания связи "один ко многим" между пользователем и файлами
  // Один пользователь может иметь множество файлов
  // В качестве аргументов передаем функцию, возвращающую тип FileEntity, и функцию-отображение сущности FileEntity на свойство 'user'
  @OneToMany(() => FileEntity, (file: FileEntity) => file.user)
  // Определяем свойство "files" как массив объектов FileEntity для связи с файлами пользователя
  files: FileEntity[];
}
