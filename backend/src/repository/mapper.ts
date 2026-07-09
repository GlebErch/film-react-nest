import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { Film, FilmSchedule } from './entities/film.schema';

export const toFilmDto = (film: Film): FilmDto => ({
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

export const toScheduleDto = (schedule: FilmSchedule): ScheduleDto => ({
  id: schedule.id,
  daytime: schedule.daytime,
  hall: String(schedule.hall),
  rows: schedule.rows,
  seats: schedule.seats,
  price: schedule.price,
  taken: schedule.taken,
});

export const toTicketDto = (
  filmId: string,
  schedule: FilmSchedule,
  row: number,
  seat: number,
): TicketDto => ({
  film: filmId,
  session: schedule.id,
  daytime: schedule.daytime,
  row,
  seat,
  price: schedule.price,
});
