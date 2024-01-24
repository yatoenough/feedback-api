import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { FilesModule } from 'src/modules/files/files.module';
import { SettingsModule } from 'src/modules/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), FilesModule, SettingsModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
