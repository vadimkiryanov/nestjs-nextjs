import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  // Найти пользователя по электронной почте
  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  // Найти пользователя по идентификатору
  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  // Создать нового пользователя на основе CreateUserDto
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
