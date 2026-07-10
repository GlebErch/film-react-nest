import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { Film, FilmDocument, FilmSchedule } from './entities/film.schema';
import { toFilmDto, toScheduleDto, toTicketDto } from './mapper';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAllFilms(): Promise<FilmDto[]> {
    const films = await this.filmModel.find().lean();
    return films.map((film) => toFilmDto(film));
  }

  async findScheduleByFilmId(filmId: string): Promise<ScheduleDto[]> {
    const film = await this.filmModel.findOne({ id: filmId }).lean();
    if (!film) {
      throw new NotFoundException({ error: 'Film not found' });
    }

    return film.schedule.map((schedule) => toScheduleDto(schedule));
  }

  async reserveTickets(requestedTickets: TicketDto[]): Promise<TicketDto[]> {
    const seatsInRequest = new Set<string>();
    const seatsToReserve: string[] = [];

    for (const ticket of requestedTickets) {
      const film = await this.filmModel.findOne({ id: ticket.film });
      if (!film) {
        throw new NotFoundException({ error: 'Film not found' });
      }

      const schedule = film.schedule.find(
        (session: FilmSchedule) => session.id === ticket.session,
      );
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

    for (let index = 0; index < requestedTickets.length; index += 1) {
      const ticket = requestedTickets[index];
      const seatKey = seatsToReserve[index];

      const updatedFilm = await this.filmModel.findOneAndUpdate(
        {
          id: ticket.film,
          schedule: {
            $elemMatch: {
              id: ticket.session,
              taken: { $ne: seatKey },
            },
          },
        },
        {
          $addToSet: {
            'schedule.$.taken': seatKey,
          },
        },
        { new: true },
      );

      if (!updatedFilm) {
        throw new BadRequestException({ error: 'Seat already taken' });
      }

      const updatedSchedule = updatedFilm.schedule.find(
        (session: FilmSchedule) => session.id === ticket.session,
      );
      if (!updatedSchedule) {
        throw new NotFoundException({ error: 'Session not found' });
      }

      confirmedTickets.push(
        toTicketDto(ticket.film, updatedSchedule, ticket.row, ticket.seat),
      );
    }

    return confirmedTickets;
  }
}
