import { FileEntity } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Называем имя сущности

// Описываем схему
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @OneToMany(() => FileEntity, (file: FileEntity) => file.user) // Связь от одного ко многому / У одного юзера может быть много файлов
  files: FileEntity[];
}
