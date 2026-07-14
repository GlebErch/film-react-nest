import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';

const toStringArray = (
  value: string | string[] | null | undefined,
): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const toFilmDto = (film: FilmEntity): FilmDto => ({
  id: film.id,
  rating: film.rating,
  director: film.director,
  tags: toStringArray(film.tags),
  title: film.title,
  about: film.about,
  description: film.description,
  image: film.image,
  cover: film.cover,
});

export const toScheduleDto = (schedule: ScheduleEntity): ScheduleDto => ({
  id: schedule.id,
  daytime: schedule.daytime,
  hall: String(schedule.hall),
  rows: schedule.rows,
  seats: schedule.seats,
  price: schedule.price,
  taken: toStringArray(schedule.taken),
});

export const toTicketDto = (
  filmId: string,
  schedule: ScheduleEntity,
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
