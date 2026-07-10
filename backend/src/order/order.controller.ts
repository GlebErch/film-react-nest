import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() payload: CreateOrderDto): Promise<OrderResponseDto> {
    return this.orderService.createOrder(payload);
  }
}
