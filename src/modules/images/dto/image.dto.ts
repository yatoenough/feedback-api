import { Expose, Transform } from 'class-transformer';

export class ImageDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  path: string;

  @Expose()
  breakpoint: number;

  @Expose()
  defaultColor: string;

  @Expose()
  @Transform(({ obj }) => obj.setting.id)
  settingID: string;
}
