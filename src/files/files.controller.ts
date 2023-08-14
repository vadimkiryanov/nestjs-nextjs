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
  Query,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { fileStorage } from './storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { FileType } from './entities/file.entity';

@Controller('files')
@ApiTags('files') // Добавляет тег "files"
@UseGuards(JwtAuthGuard) // Использует JwtAuthGuard
@ApiBearerAuth() // Добавляет Bearer-токен в заголовок авторизации
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
    return this.filesService.findAll(userId, fileType);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage, // Использует определенное хранилище для файлов
    }),
  )
  @ApiConsumes('multipart/form-data') // Указывает тип запроса как multipart/form-data
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
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })], // Применяет валидацию на размер файла (максимум 5 МБ)
      }),
    )
    file: Express.Multer.File,
    @UserId() userId: number,
  ) {
    return this.filesService.create(file, userId); // Возвращает загруженный файл
  }

  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    return this.filesService.remove(userId, ids);
  }
}
