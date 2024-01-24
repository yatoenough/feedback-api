import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Serialize } from 'src/shared/decorators/serialize.decorator';
import { ImageDto } from './dto/image.dto';
import { ApiTags } from '@nestjs/swagger';

@Serialize(ImageDto)
@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('path'))
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.imagesService.create(createImageDto, img);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('path'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.imagesService.update(id, updateImageDto, img);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.remove(id);
  }
}
