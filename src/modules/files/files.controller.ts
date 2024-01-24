import { Controller, Query, Get, Res, Header } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('static')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Get()
  @Header('Cache-Control', 'max-age=604800')
  getFile(@Res() res: Response, @Query('path') key?: string) {
    return this.fileService.getFile(key, res);
  }
}
