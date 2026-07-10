import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';

export const toFilmDto = (film: FilmEntity): FilmDto => ({
  id: film.id,
  rating: film.rating,
  director: film.director,
  tags: film.tags,
  title: film.title,
  about: film.about,
  description: film.description,
  image: film.image,
  cover: film.cover,
});

export const toScheduleDto = (schedule: ScheduleEntity): ScheduleDto => ({
  id: schedule.id,
  daytime: schedule.daytime.toISOString(),
  hall: String(schedule.hall),
  rows: schedule.rows,
  seats: schedule.seats,
  price: schedule.price,
  taken: schedule.taken,
});

export const toTicketDto = (
  filmId: string,
  schedule: ScheduleEntity,
  row: number,
  seat: number,
): TicketDto => ({
  film: filmId,
  session: schedule.id,
  daytime: schedule.daytime.toISOString(),
  row,
  seat,
  price: schedule.price,
});
