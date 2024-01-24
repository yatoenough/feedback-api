import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import 'dotenv/config';

export const TypeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: true, //TODO: implement migrations
};
