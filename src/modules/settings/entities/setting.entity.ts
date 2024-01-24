import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'settings' })
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;
}
