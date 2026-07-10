import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async getFilms(): Promise<FilmsResponseDto> {
    const items = await this.filmRepository.findAllFilms();
    return {
      total: items.length,
      items,
    };
  }

  async getScheduleByFilmId(id: string): Promise<ScheduleResponseDto> {
    const items = await this.filmRepository.findScheduleByFilmId(id);
    return {
      total: items.length,
      items,
    };
  }
}
