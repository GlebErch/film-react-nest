import 'dotenv/config';
import { DataSource } from 'typeorm';
import { FilmEntity } from './repository/entities/film.entity';
import { ScheduleEntity } from './repository/entities/schedule.entity';

const normalizedDriver = (process.env.DATABASE_DRIVER ?? 'postgres')
  .replace(/"/g, '')
  .trim()
  .toLowerCase();

if (normalizedDriver !== 'postgres') {
  throw new Error('Only postgres DATABASE_DRIVER is supported');
}

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL ?? 'postgres://localhost:5432/films',
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  entities: [FilmEntity, ScheduleEntity],
  migrations: ['src/migrations/*.ts'],
});
