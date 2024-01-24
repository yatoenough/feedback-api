import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './create-image.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  breakpoint?: number;

  @ApiPropertyOptional()
  defaultColor?: string;

  @ApiPropertyOptional()
  settingID?: string;
}
	