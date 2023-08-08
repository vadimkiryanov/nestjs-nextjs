import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { fileStorage } from './storage';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
@ApiTags('files') // Добавляет тег ==> default -> users / перемещает методы в этот тег
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
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
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }
}
