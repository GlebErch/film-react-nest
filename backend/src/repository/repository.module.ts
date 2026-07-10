import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './entities/film.schema';
import { FilmRepository } from './film.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [FilmRepository],
  exports: [FilmRepository],
})
export class RepositoryModule {}
