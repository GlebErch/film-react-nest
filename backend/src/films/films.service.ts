import { Inject, Injectable } from '@nestjs/common';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';
import { APP_REPOSITORY } from '../repository/app-repository.token';
import { FilmsRepository } from '../repository/interfaces/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(APP_REPOSITORY) private readonly filmRepository: FilmsRepository,
  ) {}

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
