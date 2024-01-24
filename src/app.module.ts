import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './database/database.config';
import { SettingsModule } from './modules/settings/settings.module';
import { ImagesModule } from './modules/images/images.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmOptions),
    SettingsModule,
    ImagesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
