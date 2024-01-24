import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto } from './create-setting.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  subtitle?: string;
}
