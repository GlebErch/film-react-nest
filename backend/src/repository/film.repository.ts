import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { FilmEntity } from './entities/film.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { FilmsRepository } from './interfaces/films.repository';
import { toFilmDto, toScheduleDto, toTicketDto } from './mapper';

@Injectable()
export class FilmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly films: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly schedules: Repository<ScheduleEntity>,
  ) {}

  async findAllFilms(): Promise<FilmDto[]> {
    const films = await this.films.find();
    return films.map((film) => toFilmDto(film));
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]> {
    const film = await this.films.findOne({ where: { id: filmId } });
    if (!film) {
      throw new NotFoundException({ error: 'Film not found' });
    }

    const schedule = await this.schedules.find({
      where: { filmId },
      order: { daytime: 'ASC' },
    });

    return schedule.map((session) => toScheduleDto(session));
  }

  async reserveTickets(requestedTickets: TicketDto[]): Promise<TicketDto[]> {
    const seatsInRequest = new Set<string>();
    const seatsToReserve: string[] = [];

    for (const ticket of requestedTickets) {
      const film = await this.films.findOne({ where: { id: ticket.film } });
      if (!film) {
        throw new NotFoundException({ error: 'Film not found' });
      }

      const schedule = await this.schedules.findOne({
        where: { id: ticket.session, filmId: ticket.film },
      });
      if (!schedule) {
        throw new NotFoundException({ error: 'Session not found' });
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      const uniqueKey = `${ticket.film}:${ticket.session}:${seatKey}`;

      if (seatsInRequest.has(uniqueKey)) {
        throw new BadRequestException({ error: 'Seat already taken' });
      }

      if (schedule.taken.includes(seatKey)) {
        throw new BadRequestException({ error: 'Seat already taken' });
      }

      seatsInRequest.add(uniqueKey);
      seatsToReserve.push(seatKey);
    }

    const confirmedTickets: TicketDto[] = [];

    await this.schedules.manager.transaction(async (manager) => {
      for (let index = 0; index < requestedTickets.length; index += 1) {
        const ticket = requestedTickets[index];
        const seatKey = seatsToReserve[index];

        const scheduleRepo = manager.getRepository(ScheduleEntity);
        const session = await scheduleRepo.findOne({
          where: { id: ticket.session, filmId: ticket.film },
          lock: { mode: 'pessimistic_write' },
        });

        if (!session) {
          throw new NotFoundException({ error: 'Session not found' });
        }

        if (session.taken.includes(seatKey)) {
          throw new BadRequestException({ error: 'Seat already taken' });
        }

        session.taken = [...session.taken, seatKey];
        const updatedSession = await scheduleRepo.save(session);
        confirmedTickets.push(
          toTicketDto(ticket.film, updatedSession, ticket.row, ticket.seat),
        );
      }
    });

    return confirmedTickets;
  }
}
