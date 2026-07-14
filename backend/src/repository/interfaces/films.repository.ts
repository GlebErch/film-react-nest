import { FilmDto, ScheduleDto } from '../../films/dto/films.dto';
import { TicketDto } from '../../order/dto/order.dto';

export interface FilmsRepository {
  findAllFilms(): Promise<FilmDto[]>;
  findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]>;
  reserveTickets(requestedTickets: TicketDto[]): Promise<TicketDto[]>;
}
