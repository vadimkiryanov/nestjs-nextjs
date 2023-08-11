import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { fileStorage } from './storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('files')
@ApiTags('files') // Добавляет тег ==> default -> users / перемещает методы в этот тег
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data') // Тип запроса
  // Возвращаемая схема боди
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // Загрузка файлов
  create(
    @UploadedFile(
      new ParseFilePipe({
        // Валидация
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })], // MaxSize указывается в байтах
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
