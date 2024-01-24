import { Image } from '../../images/entities/image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'settings' })
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @OneToMany(() => Image, (img) => img.setting)
  images: Image[];
}
