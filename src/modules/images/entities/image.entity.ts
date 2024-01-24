import { Setting } from '../../settings/entities/setting.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  breakpoint: number;

  @Column({ default: '#c042da' })
  defaultColor: string;

  @ManyToOne(() => Setting, (setting) => setting.images)
  setting: Setting;
}
