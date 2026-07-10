import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmRepository } from '../repository/film.repository';
import {
  CreateOrderDto,
  OrderResponseDto,
  OrderTicketDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmRepository) {}

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
