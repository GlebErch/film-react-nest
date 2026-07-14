import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderTicketDto,
} from './dto/order.dto';
import { APP_REPOSITORY } from '../repository/app-repository.token';
import { FilmsRepository } from '../repository/interfaces/films.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(APP_REPOSITORY) private readonly filmRepository: FilmsRepository,
  ) {}

  async createOrder(payload: CreateOrderDto): Promise<OrderResponseDto> {
    const reserved = await this.filmRepository.reserveTickets(payload.tickets);
    const items: OrderTicketDto[] = reserved.map((ticket) => ({
      ...ticket,
      id: randomUUID(),
    }));

    return {
      total: items.length,
      items,
    };
  }
}
