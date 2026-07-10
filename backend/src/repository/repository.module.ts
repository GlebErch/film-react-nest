import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_REPOSITORY } from './app-repository.token';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { FilmRepository } from './film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  providers: [
    FilmRepository,
    {
      provide: APP_REPOSITORY,
      useExisting: FilmRepository,
    },
  ],
  exports: [FilmRepository, APP_REPOSITORY],
})
export class RepositoryModule {}
