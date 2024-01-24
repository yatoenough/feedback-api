import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private readonly repo: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const setting = this.repo.create(createSettingDto);
    return await this.repo.save(setting);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const setting = await this.repo.findOne({
      where: { id },
    });
    if (!setting) throw new NotFoundException('Setting not found');
    return setting;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    const setting = await this.findOne(id);
    if (!setting) throw new NotFoundException('Setting not found');
    Object.assign(setting, updateSettingDto);
    return this.repo.save(setting);
  }

  async remove(id: string) {
    const setting = await this.findOne(id);
    if (!setting) throw new NotFoundException('Setting not found');
    return await this.repo.remove(setting);
  }
}
