import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  breakpoint: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  defaultColor: string;

  @IsUUID('all')
  @IsNotEmpty()
  @ApiProperty()
  settingID: string;
}
