import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: jest.Mocked<Pick<OrderService, 'createOrder'>>;

  beforeEach(async () => {
    orderService = {
      createOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderService,
        },
      ],
    }).compile();

    controller = module.get(OrderController);
  });

  it('createOrder passes payload to service and returns result', async () => {
    const payload: CreateOrderDto = {
      email: 'test@test.ru',
      phone: '+70000000000',
      tickets: [
        {
          film: 'film-1',
          session: 'session-1',
          daytime: '2024-06-28T10:00:53.000Z',
          row: 1,
          seat: 1,
          price: 350,
        },
      ],
    };
    const response = {
      total: 1,
      items: [
        {
          ...payload.tickets[0],
          id: 'ticket-1',
        },
      ],
    };
    orderService.createOrder.mockResolvedValue(response);

    await expect(controller.createOrder(payload)).resolves.toEqual(response);
    expect(orderService.createOrder).toHaveBeenCalledWith(payload);
  });
});
