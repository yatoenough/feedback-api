import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/modules/files/files.service';
import { SettingsService } from 'src/modules/settings/settings.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private readonly repo: Repository<Image>,
    private readonly filesService: FilesService,
    private readonly settingsService: SettingsService,
  ) {}

  async create(createImageDto: CreateImageDto, image: Express.Multer.File) {
    const setting = await this.settingsService.findOne(
      createImageDto.settingID,
    );

    const fileName = await this.filesService.uploadFile(image);
    const filePath = `${process.env.API_URL}/static/?path=static/${fileName}`;

    const newImage = this.repo.create({ ...createImageDto, path: filePath });
    newImage.setting = setting;
    return await this.repo.save(newImage);
  }

  async findAll() {
    return await this.repo.find({ relations: { setting: true } });
  }

  async findOne(id: string) {
    const image = await this.repo.findOne({
      where: { id },
      relations: { setting: true },
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
  }

  async update(
    id: string,
    updateImageDto: UpdateImageDto,
    newImage: Express.Multer.File,
  ) {
    const image = await this.findOne(id);
    if (!image) throw new NotFoundException('Image not found');

    if (!newImage) {
      Object.assign(image, updateImageDto);
      return this.repo.save(image);
    }
    const fileToDelete = image.path.split('/').pop();
    await this.filesService.deleteFile(`static/${fileToDelete}`);

    const updatedImage = await this.filesService.uploadFile(newImage);
    Object.assign(image, {
      ...updateImageDto,
      path: `${process.env.API_URL}/static/?path=static/${updatedImage}`,
    });
    return await this.repo.save(image);
  }

  async remove(id: string) {
    const image = await this.findOne(id);
    if (!image) throw new NotFoundException('Image not found');

    const fileToDelete = image.path.split('/').pop();
    await this.filesService.deleteFile(`static/${fileToDelete}`);

    return await this.repo.remove(image);
  }
}
