import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  // Описываем схему
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;
  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  // Связь множества к одному / много файлов у одного пользователя
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}
