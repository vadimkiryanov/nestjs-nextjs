// Импортируем необходимые зависимости
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity, FileType } from './entities/file.entity';
import { Repository } from 'typeorm';

// Определение класса сервиса и декорируем его с @Injectable()
@Injectable()
export class FilesService {
  // Внедряем зависимость Repository для работы с файлами
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  // Метод для получения всех файлов пользователя определенного типа (фото или из корзины)
  findAll(userId: number, fileType: FileType) {
    // Создаем запрос к базе данных
    const qb = this.repository.createQueryBuilder('file');

    // Ограничиваем запрос файлами от определенного пользователя
    qb.where('file.userId = :userId', { userId });

    // Фильтруем файлы по типу, в зависимости от `FileType`
    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }

    // Возвращаем результаты запроса
    return qb.getMany();
  }

  // Метод для создания нового файла
  create(file: Express.Multer.File, userId: number) {
    // Сохраняем новый файл в базе данных, используя Repository
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  // Метод для удаления файла или файлов (soft delete)
  async remove(userId: number, ids: string) {
    // Разделяем строку с идентификаторами файлов на массив
    const idsArray = ids.split(',');

    // Создаем запрос к базе данных для удаления файла или файлов
    const db = this.repository.createQueryBuilder('file');

    // Условие для удаления файлов только определенного пользователя и с заданными идентификаторами
    db.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    // Выполняем мягкое удаление файлов и возвращаем результат
    return db.softDelete().execute();
  }
}
